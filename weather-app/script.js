'use strict';

// Visual Crossing's free Timeline endpoint supports anonymous requests.
// Keep API access, JSON processing, and DOM rendering in separate functions.
const API_BASE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const CACHE_MS = 10 * 60 * 1000;
const cache = new Map();
let weatherData = null;
let temperatureUnit = 'F';

const form = document.querySelector('#search-form');
const locationInput = document.querySelector('#location-input');
const searchButton = document.querySelector('#search-button');
const statusElement = document.querySelector('#status');
const resultsElement = document.querySelector('#weather-results');
const fahrenheitButton = document.querySelector('#fahrenheit-button');
const celsiusButton = document.querySelector('#celsius-button');

/** Fetch raw JSON for a user-entered location. Temperatures are requested in °F. */
async function fetchWeather(location) {
  const cleanLocation = location.trim();
  if (cleanLocation.length < 2) throw new Error('Please enter a city or ZIP code.');

  const key = cleanLocation.toLowerCase();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_MS) {
    console.log('Using cached Visual Crossing response:', cached.data);
    return cached.data;
  }

  const url = new URL(`${API_BASE}/${encodeURIComponent(cleanLocation)}`);
  url.searchParams.set('unitGroup', 'us');
  url.searchParams.set('include', 'current,days');
  url.searchParams.set('contentType', 'json');
  url.searchParams.set('source', 'llms');

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 400 || response.status === 404) throw new Error('Location not found. Try adding a state or country.');
    if (response.status === 429) throw new Error('Weather request limit reached. Please try again later.');
    throw new Error(`Weather service returned an error (${response.status}).`);
  }

  const json = await response.json();
  console.log('Raw Visual Crossing JSON:', json);
  cache.set(key, { time: Date.now(), data: json });
  return json;
}

/** Reduce the API JSON to the properties this application displays. */
function processWeather(json) {
  if (!json || (!json.currentConditions && !json.days?.length)) {
    throw new Error('No weather information was returned for this location.');
  }
  const current = json.currentConditions || json.days[0];
  const processed = {
    location: json.resolvedAddress || json.address || 'Selected location',
    timezone: json.timezone || '',
    observedAt: current.datetime || '',
    temperatureF: current.temp,
    feelsLikeF: current.feelslike,
    conditions: current.conditions || 'Conditions unavailable',
    icon: current.icon || '',
    humidity: current.humidity,
    windMph: current.windspeed,
    precipitationChance: current.precipprob,
    uvIndex: current.uvindex,
    forecast: (json.days || []).slice(0, 5).map(day => ({
      date: day.datetime,
      highF: day.tempmax,
      lowF: day.tempmin,
      conditions: day.conditions || 'Forecast unavailable',
      icon: day.icon || ''
    }))
  };
  console.log('Processed weather object:', processed);
  return processed;
}

function formatTemperature(fahrenheit) {
  if (typeof fahrenheit !== 'number') return '—';
  const value = temperatureUnit === 'F' ? fahrenheit : (fahrenheit - 32) * 5 / 9;
  return `${Math.round(value)}°${temperatureUnit}`;
}

function weatherSymbol(icon) {
  const symbols = {
    'clear-day': '☀️', 'clear-night': '🌙', 'partly-cloudy-day': '🌤️',
    'partly-cloudy-night': '☁️', 'cloudy': '☁️', 'rain': '🌧️',
    'snow': '❄️', 'snow-showers-day': '🌨️', 'snow-showers-night': '🌨️',
    'showers-day': '🌦️', 'showers-night': '🌧️', 'thunder-rain': '⛈️',
    'thunder-showers-day': '⛈️', 'thunder-showers-night': '⛈️',
    'fog': '🌫️', 'wind': '💨', 'hail': '🌨️'
  };
  return symbols[icon] || '🌡️';
}

function formatDay(dateString) {
  // Parse YYYY-MM-DD as a local calendar date rather than UTC midnight.
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  };
}

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

/** Render weather from the processed object; no extra API call on unit changes. */
function renderWeather(data) {
  setText('#place-name', data.location);
  setText('#updated-time', data.observedAt ? `Local observation time: ${data.observedAt}${data.timezone ? ` · ${data.timezone}` : ''}` : 'Latest available conditions');
  setText('#current-icon', weatherSymbol(data.icon));
  setText('#current-temperature', formatTemperature(data.temperatureF));
  setText('#current-description', data.conditions);
  setText('#feels-like', `Feels like ${formatTemperature(data.feelsLikeF)}`);
  setText('#humidity', typeof data.humidity === 'number' ? `${Math.round(data.humidity)}%` : '—');
  setText('#wind', typeof data.windMph === 'number' ? `${Math.round(data.windMph * (temperatureUnit === 'F' ? 1 : 1.609344))} ${temperatureUnit === 'F' ? 'mph' : 'km/h'}` : '—');
  setText('#precipitation', typeof data.precipitationChance === 'number' ? `${Math.round(data.precipitationChance)}%` : '—');
  setText('#uv-index', typeof data.uvIndex === 'number' ? String(Math.round(data.uvIndex)) : '—');

  const grid = document.querySelector('#forecast-grid');
  grid.replaceChildren();
  for (const forecast of data.forecast) {
    const day = formatDay(forecast.date);
    const card = document.createElement('article');
    card.className = 'forecast-day';
    const title = document.createElement('div');
    title.className = 'day-name';
    title.textContent = day.day;
    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = day.date;
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = weatherSymbol(forecast.icon);
    const temps = document.createElement('div');
    temps.className = 'day-temps';
    const high = document.createElement('span');
    high.textContent = formatTemperature(forecast.highF);
    const low = document.createElement('span');
    low.className = 'low';
    low.textContent = formatTemperature(forecast.lowF);
    temps.append(high, low);
    const summary = document.createElement('p');
    summary.className = 'summary';
    summary.textContent = forecast.conditions;
    card.append(title, date, icon, temps, summary);
    grid.append(card);
  }
  resultsElement.hidden = false;
}

async function searchLocation(location) {
  searchButton.disabled = true;
  searchButton.textContent = 'Loading…';
  statusElement.classList.remove('error');
  statusElement.textContent = `Checking weather for ${location}…`;
  try {
    const raw = await fetchWeather(location);
    weatherData = processWeather(raw);
    renderWeather(weatherData);
    statusElement.textContent = '';
  } catch (error) {
    console.error('Weather lookup failed:', error);
    statusElement.classList.add('error');
    statusElement.textContent = error instanceof TypeError
      ? 'Could not connect to Visual Crossing. Check your connection or browser network restrictions.'
      : error.message;
  } finally {
    searchButton.disabled = false;
    searchButton.innerHTML = 'Get forecast <span aria-hidden="true">↗</span>';
  }
}

function changeUnit(unit) {
  temperatureUnit = unit;
  fahrenheitButton.classList.toggle('active', unit === 'F');
  celsiusButton.classList.toggle('active', unit === 'C');
  fahrenheitButton.setAttribute('aria-pressed', String(unit === 'F'));
  celsiusButton.setAttribute('aria-pressed', String(unit === 'C'));
  if (weatherData) renderWeather(weatherData);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  searchLocation(locationInput.value.trim());
});
fahrenheitButton.addEventListener('click', () => changeUnit('F'));
celsiusButton.addEventListener('click', () => changeUnit('C'));

// Load a starting location so the page shows live data immediately.
searchLocation(locationInput.value);

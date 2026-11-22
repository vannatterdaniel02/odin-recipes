# Hollow Creek Weather

A responsive JavaScript weather app built with HTML, CSS, and vanilla JavaScript for the Visual Crossing Weather API assignment.

## Features
- Search by city, state, country, or ZIP code
- Current temperature, conditions, feels-like temperature, humidity, wind, precipitation chance, and UV index
- Five-day forecast
- Fahrenheit / Celsius toggle (converts cached values; no second request)
- API error handling and 10-minute in-memory caching
- Raw JSON and processed object logged to browser developer console
- Visual Crossing attribution

## Run
1. Open `index.html` in a modern browser with internet access, or use the VS Code Live Server extension.
2. Enter a city and click **Get forecast**.
3. Switch between **°F** and **°C**.
4. Open browser Developer Tools > Console to see the raw and processed JSON.

The API endpoint is `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` and uses Visual Crossing's free anonymous access (no key). Availability, usage limits, and browser access are controlled by the API provider. If a browser blocks the request, use a local web server and check the network console.

## Assignment mapping
1. `index.html` links `style.css` and `script.js`.
2. `fetchWeather(location)` fetches and logs the API JSON.
3. `processWeather(json)` returns only fields used by the app.
4. The search form triggers `searchLocation` and logs results.
5. `renderWeather()` displays results; `changeUnit()` toggles temperature units.
6. `style.css` provides responsive styling.

Weather data provided by [Visual Crossing Weather](https://www.visualcrossing.com/).

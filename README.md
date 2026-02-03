# 🌦️ Weather Dashboard CLI

A beautiful, real-time weather dashboard for the command line. Get current conditions, hourly forecasts, and 7-day predictions with colorful terminal output.

## Features

✨ **Beautiful Terminal UI** - ASCII art headers and colored output
🌡️ **Real-time Weather** - Current temperature, humidity, and wind speed
⛅ **Weather Icons** - Visual representations of weather conditions
📅 **7-Day Forecast** - High/low temperatures and weather predictions
🌍 **Automatic Location** - Uses your coordinates (currently set to London, UK)

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

Or if installed globally:
```bash
weather
```

## Dependencies

- **axios** - HTTP requests for weather data
- **chalk** - Colored terminal output
- **figlet** - ASCII art text

## API

Uses the free [Open-Meteo API](https://open-meteo.com/) - no API key required!

## Customization

Edit `index.js` to:
- Change the location coordinates (latitude/longitude)
- Add more weather metrics
- Customize colors and formatting
- Add additional features like alerts or history

## Example Output

```
┌─────────────────────────────┐
│  ___  _    ___  ___ ___    │
│ |  \ | |  |__  |    |      │
│ |  | | |__  __ |    |      │
│ |__/ |____|    |__  |___   │
└─────────────────────────────┘

📍 London, UK

Current Weather:
  ⛅ Partly cloudy
  Temperature: 14°C
  Humidity: 72%
  Wind Speed: 12 km/h

7-Day Forecast:
  Mon: ⛅ Partly cloudy High 16°C / Low 9°C
  Tue: 🌧️  Slight rain High 14°C / Low 8°C
  Wed: ☀️  Clear sky High 18°C / Low 7°C
```

## License

ISC

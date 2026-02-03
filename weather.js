const axios = require('axios');

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

async function getLocation() {
  const response = await axios.get('https://ipapi.co/json/');
  return {
    latitude: response.data.latitude,
    longitude: response.data.longitude,
    city: response.data.city,
    country: response.data.country_name,
  };
}

async function getWeather(latitude, longitude) {
  const response = await axios.get(BASE_URL, {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      hourly: 'temperature_2m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
    },
  });

  return response.data;
}

function getWeatherDescription(code) {
  const descriptions = {
    0: '☀️  Clear sky',
    1: '🌤️  Mostly clear',
    2: '⛅ Partly cloudy',
    3: '☁️  Overcast',
    45: '🌫️  Foggy',
    48: '🌫️  Foggy (rime)',
    51: '🌧️  Light drizzle',
    61: '🌧️  Slight rain',
    63: '🌧️  Moderate rain',
    65: '🌧️  Heavy rain',
    71: '🌨️  Slight snow',
    80: '⛈️  Thunderstorm',
  };
  return descriptions[code] || '🌡️  Unknown';
}

module.exports = {
  getLocation,
  getWeather,
  getWeatherDescription,
};

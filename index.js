#!/usr/bin/env node

const axios = require('axios');
const chalk = require('chalk').default || require('chalk');
const figlet = require('figlet');

const API_KEY = process.env.WEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

async function getLocation() {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    return {
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      city: response.data.city,
      country: response.data.country_name,
    };
  } catch (error) {
    console.error(chalk.red(`Error detecting location: ${error.message}`));
    process.exit(1);
  }
}

async function getWeather(latitude, longitude) {
  try {
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
  } catch (error) {
    console.error(chalk.red(`Error fetching weather: ${error.message}`));
    process.exit(1);
  }
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

async function displayWeather() {
  console.clear();
  
  console.log(chalk.cyan(figlet.textSync('WEATHER', { horizontalLayout: 'default' })));
  console.log(chalk.bold.blue('═══════════════════════════════════════\n'));

  const location = await getLocation();
  const weather = await getWeather(location.latitude, location.longitude);
  const current = weather.current;
  const daily = weather.daily;

  console.log(chalk.yellow(`📍 ${location.city}, ${location.country}\n`));
  
  console.log(chalk.bold('Current Weather:'));
  console.log(`  ${getWeatherDescription(current.weather_code)}`);
  console.log(`  Temperature: ${chalk.red(current.temperature_2m + '°C')}`);
  console.log(`  Humidity: ${chalk.blue(current.relative_humidity_2m + '%')}`);
  console.log(`  Wind Speed: ${chalk.cyan(current.wind_speed_10m + ' km/h')}\n`);

  console.log(chalk.bold('7-Day Forecast:'));
  for (let i = 0; i < Math.min(7, daily.time.length); i++) {
    const date = new Date(daily.time[i]).toLocaleDateString('en-US', { weekday: 'short' });
    const description = getWeatherDescription(daily.weather_code[i]);
    const high = chalk.red(daily.temperature_2m_max[i] + '°C');
    const low = chalk.blue(daily.temperature_2m_min[i] + '°C');
    console.log(`  ${date}: ${description} High ${high} / Low ${low}`);
  }

  console.log(chalk.bold.blue('\n═══════════════════════════════════════'));
  console.log(chalk.gray('Updated at ' + new Date().toLocaleTimeString()));
}

displayWeather();

#!/usr/bin/env node

const chalk = require('chalk').default || require('chalk');
const figlet = require('figlet');
const { getLocation, getWeather, getWeatherDescription } = require('./weather');

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

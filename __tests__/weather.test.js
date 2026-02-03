const { getWeatherDescription } = require('../weather');

describe('Weather Description', () => {
  test('should return clear sky emoji for code 0', () => {
    expect(getWeatherDescription(0)).toBe('☀️  Clear sky');
  });

  test('should return mostly clear emoji for code 1', () => {
    expect(getWeatherDescription(1)).toBe('🌤️  Mostly clear');
  });

  test('should return partly cloudy emoji for code 2', () => {
    expect(getWeatherDescription(2)).toBe('⛅ Partly cloudy');
  });

  test('should return overcast emoji for code 3', () => {
    expect(getWeatherDescription(3)).toBe('☁️  Overcast');
  });

  test('should return foggy emoji for code 45', () => {
    expect(getWeatherDescription(45)).toBe('🌫️  Foggy');
  });

  test('should return rain emoji for code 61', () => {
    expect(getWeatherDescription(61)).toBe('🌧️  Slight rain');
  });

  test('should return snow emoji for code 71', () => {
    expect(getWeatherDescription(71)).toBe('🌨️  Slight snow');
  });

  test('should return thunderstorm emoji for code 80', () => {
    expect(getWeatherDescription(80)).toBe('⛈️  Thunderstorm');
  });

  test('should return unknown for unrecognized code', () => {
    expect(getWeatherDescription(999)).toBe('🌡️  Unknown');
  });

  test('should handle negative codes as unknown', () => {
    expect(getWeatherDescription(-1)).toBe('🌡️  Unknown');
  });
});

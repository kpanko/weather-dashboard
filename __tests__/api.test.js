jest.mock('axios');
const axios = require('axios');
const { getLocation, getWeather } = require('../weather');

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getLocation', () => {
    test('should return location data from IP API', async () => {
      const mockData = {
        latitude: 41.3083,
        longitude: -72.9279,
        city: 'New Haven',
        country_name: 'United States',
      };

      axios.get.mockResolvedValue({ data: mockData });

      const result = await getLocation();

      expect(result).toEqual({
        latitude: 41.3083,
        longitude: -72.9279,
        city: 'New Haven',
        country: 'United States',
      });

      expect(axios.get).toHaveBeenCalledWith('https://ipapi.co/json/');
    });

    test('should handle API errors', async () => {
      const error = new Error('Network error');
      axios.get.mockRejectedValue(error);

      await expect(getLocation()).rejects.toThrow('Network error');
    });
  });

  describe('getWeather', () => {
    test('should fetch weather data for given coordinates', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: 15,
          relative_humidity_2m: 70,
          weather_code: 2,
          wind_speed_10m: 10,
        },
        daily: {
          time: ['2026-02-03', '2026-02-04'],
          weather_code: [2, 3],
          temperature_2m_max: [20, 18],
          temperature_2m_min: [10, 9],
        },
      };

      axios.get.mockResolvedValue({ data: mockWeatherData });

      const result = await getWeather(41.3083, -72.9279);

      expect(result).toEqual(mockWeatherData);
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.open-meteo.com/v1/forecast',
        expect.objectContaining({
          params: expect.objectContaining({
            latitude: 41.3083,
            longitude: -72.9279,
          }),
        })
      );
    });

    test('should include all required weather parameters', async () => {
      axios.get.mockResolvedValue({ data: {} });

      await getWeather(0, 0);

      const callArgs = axios.get.mock.calls[0][1];
      expect(callArgs.params).toHaveProperty('current');
      expect(callArgs.params).toHaveProperty('daily');
      expect(callArgs.params).toHaveProperty('timezone', 'auto');
    });

    test('should handle API errors', async () => {
      const error = new Error('Weather API error');
      axios.get.mockRejectedValue(error);

      await expect(getWeather(0, 0)).rejects.toThrow('Weather API error');
    });
  });
});

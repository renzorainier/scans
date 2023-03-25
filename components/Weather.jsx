import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather?q=Antipolo Rizal, Philippines&appid=YOUR_API_KEY&units=metric'
        );
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="p-4 rounded-lg shadow-lg">
      {weather ? (
        <>
          <h2 className="text-2xl font-bold mb-2">
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather icon"
              className="w-12 h-12 mr-2"
            />
            <span className="text-xl font-bold">{weather.main.temp}°C</span>
          </div>
          <div className="text-gray-600">
            <p>{weather.weather[0].description}</p>
            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} km/h</p>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;

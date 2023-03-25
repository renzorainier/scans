import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://api.open-meteo.com/v1/forecast?latitude=14.5885&longitude=121.1757&daily=weatherdescription,temperature_2m_max,temperature_2m_min'
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
            Antipolo, Philippines
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={`https://www.open-meteo.com/static/img/weather/png/${weather.daily.data[0].weathericon}.png`}
              alt="weather icon"
              className="w-12 h-12 mr-2"
            />
            <span className="text-xl font-bold">
              {Math.round(weather.daily.data[0].temperature_2m_min)}°C - {Math.round(weather.daily.data[0].temperature_2m_max)}°C
            </span>
          </div>
          <div className="text-gray-600">
            <p>{weather.daily.data[0].weatherdescription}</p>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;

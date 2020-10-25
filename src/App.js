import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  async function search(e) {
    if (e.key === 'Enter') {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/weather?q=${query}`);
      setWeather(data);
      setQuery('');
    }
  }

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="city-icon"
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

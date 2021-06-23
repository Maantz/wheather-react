import React, { useState } from 'react';
import axios from 'axios';

const api = {
  key: "9cbc43a378e9f35157d4dcdf6b5a2a15",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const dateBuilder = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return `${date}`
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);

  const search = async evt => {
    if (evt.key === "Enter") {
      setQuery(evt.target.value);

      const { data } = await axios(`${api.base}weather?q=${evt.target.value}&units=metric&APPID=${api.key}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      setWeather(data);
    }
  }

  return (
    <div className={weather && weather.main.temp > 16 ? 'app warm' : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            defaultValue={query}
            onKeyPress={search}
          />
        </div>
        {weather ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Example City, EX</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                15°c
              </div>
              <div className="weather">Sunny</div>
            </div>
          </div>)}
      </main>
    </div>
  );
}

export default App;

/* eslint-disable react/prop-types */
import "../style/MainSection.css";
import "../style/Responsive.css"
import React from "react";
export default function MainSection({
  weatherInfo,
  forecast,
  onPressSearch,
  setSearch,
  location,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    onPressSearch();
  };
  const datesForecast =
    forecast.list && forecast.list.length <= 40
      ? [
          {
            dtTxt: forecast.list[8] ? forecast.list[8].dt_txt : "Unknown",
            temp: forecast.list[0]
              ? forecast.list[0].main.temp.toFixed(0)
              : "NaN",
            status: forecast.list[0]
              ? forecast.list[0].weather[0].main
              : "Undefined",
          },
          {
            dtTxt: forecast.list[8] ? forecast.list[8].dt_txt : "Unknown",
            temp: forecast.list[8]
              ? forecast.list[8].main.temp.toFixed(0)
              : "NaN",
            status: forecast.list[8]
              ? forecast.list[8].weather[0].main
              : "Undefined",
          },
          {
            dtTxt: forecast.list[16] ? forecast.list[16].dt_txt : "Unknown",
            temp: forecast.list[16]
              ? forecast.list[16].main.temp.toFixed(0)
              : "NaN",
            status: forecast.list[16]
              ? forecast.list[16].weather[0].main
              : "Undefined",
          },
          {
            dtTxt: forecast.list[24] ? forecast.list[24].dt_txt : "Unknown",
            temp: forecast.list[24]
              ? forecast.list[24].main.temp.toFixed(0)
              : "NaN",
            status: forecast.list[24]
              ? forecast.list[24].weather[0].main
              : "Undefined",
          },
          {
            dtTxt: forecast.list[31] ? forecast.list[31].dt_txt : "Unknown",
            temp: forecast.list[31]
              ? forecast.list[31].main.temp.toFixed(0)
              : "NaN",
            status: forecast.list[31]
              ? forecast.list[31].weather[0].main
              : "Undefined",
          },
        ]
      : [];
      const convertTime = (dateString) => {
        const date = new Date(dateString);
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return days[date.getDay()];
      };
  const currentTime = () => {
    const currentTime = new Date();
    const dateTime =
      currentTime.getDate() +
      "." +
      (currentTime.getMonth() + 1) +
      "." +
      currentTime.getFullYear();
    return dateTime;
  };

  return (
    <section className="mainSection">
      <header className="navigation">
        {/* search */}
        <form action="" className="search">
          <input
            type="text"
            placeholder="Enter Location..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleClick}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
        <h2>{currentTime()}</h2>
      </header>
      <div className="weather-info">
        <div className="main-info">
          {/* temparature */}
          <h2>
            {weatherInfo &&
              weatherInfo.main &&
              weatherInfo.main.temp.toFixed(0)}
            °
          </h2>
          {/* status */}
          <h2>
            {weatherInfo && weatherInfo.weather && weatherInfo.weather[0].main}
          </h2>
        </div>
        <div className="other-info">
          <div>
            <span className="material-symbols-outlined">air</span>
            {/* wind speed */}
            <span>
              {weatherInfo &&
                weatherInfo.wind &&
                (weatherInfo.wind.speed * 3.6).toFixed(0)}{" "}
              km/h
            </span>
          </div>
          <div>
            <span className="material-symbols-outlined">water_drop</span>
            {/* humidity */}
            <span>
              {weatherInfo && weatherInfo.main && weatherInfo.main.humidity} %
            </span>
          </div>
        </div>
      </div>
      <div className="forecast-info">
        <div className="forecast-container">
          {datesForecast.map((date, index) => (
            <div key={index + 1} className="forecast-card">
              {/* Days */}
              <strong>
                {index === 0 ? "Today" : convertTime(date.dtTxt)}
              </strong>
              {/* Forecast Temp */}
              <span>{date.temp}°</span>
              {/* Forecast Status */}
              <span>{date.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

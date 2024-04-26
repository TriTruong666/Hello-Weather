/* eslint-disable react/prop-types */
import "../style/WeatherDetail.css";
import "../style/Responsive.css";
import { useMemo } from "react";
import BarLoader from "react-spinners/BarLoader";
export default function WeatherDetail({
  onPressDetail,
  weatherInfo,
  pollution,
  location,
  loading,
}) {
  const level = {
    color: ["good", "fair", "moderate", "poor", "emer"],
    icons: [
      "self_improvement",
      "emoji_people",
      "warning",
      "error",
      "exclamation",
    ],
    contents: ["Good", "Fair", "Moderate", "Poor", "Emergency"],
  };
  const handleColor = (aqi) => {
    switch (aqi) {
      case 1:
        return level.color[0];
      case 2:
        return level.color[1];
      case 3:
        return level.color[2];
      case 4:
        return level.color[3];
      case 5:
        return level.color[4];
      default:
        return "";
    }
  };
  const handleIcon = (aqi) => {
    switch (aqi) {
      case 1:
        return level.icons[0];
      case 2:
        return level.icons[1];
      case 3:
        return level.icons[2];
      case 4:
        return level.icons[3];
      case 5:
        return level.icons[4];
      default:
        return "";
    }
  };
  const handleContent = (aqi) => {
    switch (aqi) {
      case 1:
        return level.contents[0];
      case 2:
        return level.contents[1];
      case 3:
        return level.contents[2];
      case 4:
        return level.contents[3];
      case 5:
        return level.contents[4];
      default:
        return "";
    }
  };
  const color = useMemo(() => {
    return handleColor(pollution.list[0].main.aqi);
  }, [pollution]);
  const icon = useMemo(() => {
    return handleIcon(pollution.list[0].main.aqi);
  }, [pollution]);
  const content = useMemo(() => {
    return handleContent(pollution.list[0].main.aqi);
  }, [pollution]);

  return (
    <>
      <div className="weather-detail">
        <div className="content-container">
          {loading ? (
            <BarLoader color="#000000" height={2} width={150} />
          ) : (
            <div className="container">
              <div className="header">
                <h2>
                  {location.name} ({location.country})
                </h2>
                <span
                  className="material-symbols-outlined"
                  onClick={() => onPressDetail()}
                >
                  close
                </span>
              </div>
              <div className="weather-info">
                <h3>Weather detail</h3>
                {/* temp */}
                <div>
                  <span className="material-symbols-outlined">thermometer</span>
                  <strong>
                    {weatherInfo &&
                      weatherInfo.main &&
                      weatherInfo.main.temp.toFixed(1)}{" "}
                    °
                  </strong>
                </div>
                {/* wind */}
                <div>
                  <span className="material-symbols-outlined">airwave</span>
                  <strong>
                    {weatherInfo &&
                      weatherInfo.wind &&
                      (weatherInfo.wind.speed * 3.6).toFixed(1)}{" "}
                    km/h
                  </strong>
                </div>
                {/* humidity */}
                <div>
                  <span className="material-symbols-outlined">
                    humidity_mid
                  </span>
                  <strong>
                    {weatherInfo &&
                      weatherInfo.main &&
                      weatherInfo.main.humidity}{" "}
                    %
                  </strong>
                </div>
                {/* pressure */}
                <div>
                  <span className="material-symbols-outlined">
                    blood_pressure
                  </span>
                  <strong>
                    {weatherInfo &&
                      weatherInfo.main &&
                      weatherInfo.main.pressure}{" "}
                    hPa
                  </strong>
                </div>
                <div>
                  <span className="material-symbols-outlined">cloud</span>
                  <strong>
                    {weatherInfo &&
                      weatherInfo.weather &&
                      weatherInfo.weather[0].description}
                  </strong>
                </div>
              </div>
              <div className="pollution-info">
                <h3>Pollution detail</h3>
                <div className="content-pollution">
                  {/* pm25 */}
                  <span>PM2.5</span>
                  <strong
                    className={
                      pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.pm2_5.toFixed(0) < 10
                        ? "safe"
                        : "danger"
                    }
                  >
                    {pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.pm2_5.toFixed(0)}{" "}
                    µg/m³
                  </strong>
                </div>
                <div className="content-pollution">
                  {/* pm10 */}
                  <span>PM10</span>
                  <strong
                    className={
                      pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.pm10.toFixed(0) < 20
                        ? "safe"
                        : "danger"
                    }
                  >
                    {pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.pm10.toFixed(0)}{" "}
                    µg/m³
                  </strong>
                </div>
                <div className="content-pollution">
                  {/* no2 */}
                  <span>NO2</span>
                  <strong
                    className={
                      pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.no2.toFixed(0) < 40
                        ? "safe"
                        : "danger"
                    }
                  >
                    {pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.no2.toFixed(0)}{" "}
                    µg/m³
                  </strong>
                </div>
                <div className="content-pollution">
                  {/* so2 */}
                  <span>SO2</span>
                  <strong
                    className={
                      pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.so2.toFixed(0) < 20
                        ? "safe"
                        : "danger"
                    }
                  >
                    {pollution &&
                      pollution.list[0] &&
                      pollution.list[0].components &&
                      pollution.list[0].components.so2.toFixed(0)}{" "}
                    µg/m³
                  </strong>
                </div>

                {/* aq index */}
                <div className={"aqi " + color}>
                  <strong>Pollution level: {content}</strong>
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div className="note">
                  <small>note: </small>
                  <span className="material-symbols-outlined safe">
                    capture
                  </span>
                  <small>is safe and</small>
                  <span className="material-symbols-outlined danger">
                    capture
                  </span>
                  <small>is danger</small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

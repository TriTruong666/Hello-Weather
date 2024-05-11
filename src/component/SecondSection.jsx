/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/SecondSection.css";
import "../style/Responsive2.css";
const getCurrentTime = () => {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return time; // Return the formatted time directly
};
export default function SecondSection({
  weatherInfo,
  location,
  modal,
  onPressDetail,
}) {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime()); // Pass weatherInfo.dt to getCurrentTime
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval
  }, []);
  const weatherDescription = {
    cloudy:
      "Cloudy weather occurs when the sky is covered with clouds, obscuring direct sunlight. These clouds can vary in thickness and density, ranging from light, wispy clouds to thick, dark ones. The atmosphere often feels cool and damp during cloudy weather, and there's a sense of dimness as sunlight struggles to penetrate the cloud cover.",
    rainy:
      "Rainy weather is characterized by the presence of precipitation falling from the sky in the form of raindrops. The sky is usually overcast with thick, dark clouds, and there may be a noticeable drop in temperature. Rainy weather can range from light drizzles to heavy downpours, and it often brings with it wet and slippery conditions outdoors.",
    clear:
      "Clear weather refers to conditions where the sky is devoid of clouds, allowing for ample sunlight to reach the Earth's surface. The atmosphere appears bright and open, with a vivid blue sky overhead. Clear weather typically signifies calm and stable atmospheric conditions, with little to no precipitation expected.",
    haze: "Hazy weather occurs when fine particles and pollutants in the air scatter sunlight, reducing visibility and creating a faint, blurry atmosphere. Unlike fog, which forms close to the ground, haze typically occurs at higher altitudes and can extend over large areas.",
    thunder: "A thunderstorm is a type of weather characterized by the occurrence of thunder and lightning, often accompanied by heavy rain, strong winds, and sometimes hail. Thunderstorms are dynamic and intense atmospheric phenomena that result from the rapid upward movement of warm, moist air, which subsequently cools and condenses, forming towering cumulonimbus clouds.",
    mist: "uspension in the atmosphere of very tiny water droplets (50–500 microns in diameter) or wet hygroscopic particles that reduces horizontal visibility to 1 km (0.6 mile) or more; if the visibility is reduced below 1 km, the suspension is called a fog. Mist appears to cover the landscape with a thin, grayish veil.",
    dust: "A dust storm is a wall of dust and debris that is often blown into an area by strong winds from thunderstorms. The wall of dust can be miles long and several thousand feet high. Dust storms happen in many places around the world.",
  };
  const noticeWeather = {
    hot: [
      "Minimize strenuous physical activity to prevent overheating.",
      "Engage in water-based activities such as swimming, water sports to avoid heat.",
      "Drink plenty of water to stay hydrated and avoid dehydration.",
    ],
    cool: [
      "Engage in outdoor activities such as hiking, jogging, or cycling to stay warm.",
      "Gather around a bonfire or campfire with friends and family for warmth and camaraderie.",
      "Dress in layers to easily adjust to fluctuating temperatures throughout the day.",
    ],
    cold: [
      "Wear multiple layers of clothing, including thermal layers, hats, scarves, and gloves.",
      "Keep your body moving to generate heat by going for brisk walks, doing indoor workout.",
      "Ensure your home is well-heated to maintain a comfortable indoor temperature.",
    ],
  };
  const iconDescription = {
    hot: "emergency_heat",
    cool: "wind_power",
    cold: "severe_cold",
  };
  const noteCase = (temp) => {
    if (temp >= 30 && temp <= 60) {
      const randomIndex = Math.floor(Math.random() * noticeWeather.hot.length);
      return noticeWeather.hot[randomIndex];
    } else if (temp >= 15 && temp < 30) {
      const randomIndex = Math.floor(Math.random() * noticeWeather.cool.length);
      return noticeWeather.cool[randomIndex];
    } else if (temp < 15) {
      const randomIndex = Math.floor(Math.random() * noticeWeather.cold.length);
      return noticeWeather.cold[randomIndex];
    }
  };
  const desCase = (status) => {
    if (status === "Clouds") {
      return weatherDescription.cloudy;
    } else if (status === "Rain") {
      return weatherDescription.rainy;
    } else if (status === "Clear") {
      return weatherDescription.clear;
    } else if (status === "Haze") {
      return weatherDescription.haze;
    } else if(status === "Thunderstorm") {
      return weatherDescription.thunder;
    } else if(status === "Mist") {
      return weatherDescription.mist;
    } else if(status === "Dust") {
      return weatherDescription.dust;
    }
  };
  const iconCase = (temp) => {
    if (temp >= 30 && temp <= 60) {
      return iconDescription.hot;
    } else if (temp >= 15 && temp < 30) {
      return iconDescription.cool;
    } else if (temp < 15) {
      return iconDescription.cold;
    }
  };
  const des = useMemo(() => {
    return desCase(
      weatherInfo && weatherInfo.weather && weatherInfo.weather[0].main
    );
  }, [weatherInfo]);
  const note = useMemo(() => {
    return noteCase(
      weatherInfo && weatherInfo.main && weatherInfo.main.temp.toFixed(0)
    );
  }, [weatherInfo]);
  const icon = useMemo(() => {
    return iconCase(
      weatherInfo && weatherInfo.main && weatherInfo.main.temp.toFixed(0)
    );
  }, [weatherInfo]);
  return (
    <section className="secondSection">
      <div className="city-info">
        <h2>{location.name}</h2>
      </div>
      <div className="time-info">
        <h2>{getCurrentTime()}</h2>
      </div>
      <div className="weather-content">
        <div className="content-detail">
          <span className="material-symbols-outlined">storm</span>
          {/* pressure */}
          <p>
            Pressure:{" "}
            {weatherInfo && weatherInfo.main && weatherInfo.main.pressure} hPa
          </p>
        </div>
        <div className="content-detail">
          <span className="material-symbols-outlined">{icon}</span>
          {/* condition will make different notes */}
          <p>Note: {note}</p>
        </div>
        <h2>
          Feels like{" "}
          {weatherInfo &&
            weatherInfo.main &&
            weatherInfo.main.feels_like.toFixed(0)}
          °
        </h2>
        <button className="btn-detail" onClick={onPressDetail}>
          <p>See Detail</p>
          <span className="material-symbols-outlined">north_east</span>
        </button>
      </div>
      <div className="description">
        <h2>Description</h2>
        <span>{des}</span>
      </div>
      <footer className="footer">
        <div className="developed-info">
          <span>Developed by</span>
          <strong>Truong Hoang Tri</strong>
        </div>
        <div className="social">
          <a
            href="https://www.instagram.com/medusa_shopz/"
            className="social-container"
          >
            <box-icon name="instagram" type="logo" size="sm"></box-icon>
          </a>
          <a
            href="https://www.facebook.com/tritruong2603/"
            className="social-container"
          >
            <box-icon name="facebook-circle" type="logo" size="sm"></box-icon>
          </a>
          <a
            href="https://github.com/TriTruong666"
            className="social-container"
          >
            <box-icon name="github" type="logo" size="sm"></box-icon>
          </a>
        </div>
        <div className="copyright">
          <span>Copyright (c) 2024 Hello Weather</span>
        </div>
      </footer>
    </section>
  );
}

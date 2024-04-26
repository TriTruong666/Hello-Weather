import { useEffect, useState, CSSProperties } from "react";
import MainSection from "./component/MainSection";
import SecondSection from "./component/SecondSection";
import "./style/your-forecast.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import WeatherDetail from "./component/WeatherDetail";
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");
  const [forecast, setForecast] = useState("");
  const [pollution, setPollution] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [detailLoad, setDetailLoad] = useState(false);
  const [location, setLocation] = useState({
    lat: 10.762622,
    lon: 106.660172,
    name: "Ho Chi Minh City",
    country: "VN",
  });

  const api = {
    key: "e6a354d17937f8d0d17478ca3ef74532",
    weatherBase: "https://api.openweathermap.org/data/2.5/",
    geoBase: "http://api.openweathermap.org/geo/1.0/",
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
      const reloadResponse1 = await fetch(
        `${api.weatherBase}weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${api.key}&lang=en`
      );
      const defaultWeather = await reloadResponse1.json();
      setWeather(defaultWeather);
      const reloadResponse2 = await fetch(
        `${api.weatherBase}forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${api.key}&lang=en&cnt=33`
      );
      const defaultForecast = await reloadResponse2.json();
      setForecast(defaultForecast);
      const reloadResponse3 = await fetch(
        `${api.weatherBase}air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${api.key}`
      );
      const defaultPollution = await reloadResponse3.json();
      setPollution(defaultPollution);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onPressSearch = async () => {
    try {
      const response = await fetch(
        `${api.geoBase}direct?q=${search}&appid=${api.key}&lang=en`
      );
      const data = await response.json();
      setLocation({
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
        country: data[0].country,
      });
      const weatherResponse = await fetch(
        `${api.weatherBase}weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${api.key}&lang=en`
      );
      const weatherResult = await weatherResponse.json();
      setWeather(weatherResult);
      const forecastResponse = await fetch(
        `${api.weatherBase}forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${api.key}&lang=en&cnt=33`
      );
      const forecastResult = await forecastResponse.json();
      setForecast(forecastResult);
      const pollutionResponse3 = await fetch(
        `${api.weatherBase}air_pollution?lat=${data[0].lat}&lon=${data[0].lon}&appid=${api.key}`
      );
      const pollutionResult = await pollutionResponse3.json();
      setPollution(pollutionResult);
    } catch (error) {
      toast.error("Invalid location", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const onPressDetail = () => {
    setModal(!modal);
    setDetailLoad(true);
    setTimeout(() => {
      setDetailLoad(false);
    }, 1700);
  };
  return (
    <div className="your-forecast">
      {loading ? (
        <HashLoader color="#000000" size={70} />
      ) : (
        <>
          <MainSection
            weatherInfo={weather}
            forecast={forecast}
            onPressSearch={onPressSearch}
            setSearch={setSearch}
            location={location}
          />
          <SecondSection
            weatherInfo={weather}
            forecast={forecast}
            location={location}
            modal={modal}
            onPressDetail={onPressDetail}
          />
          {modal && (
            <WeatherDetail
              onPressDetail={onPressDetail}
              weatherInfo={weather}
              pollution={pollution}
              location={location}
              loading={detailLoad}
            />
          )}
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;

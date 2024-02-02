import React, { useEffect, useState } from "react";
import { Switch, Skeleton, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Shimmer from "./Shimmer";
import Card from "./CARD.JS";

const DEFAULT_CITY = "Leh";
const DAY_WISE_INDEX = [5, 13, 22, 27, 35];
const Body = () => {
  const [city, setcity] = useState(DEFAULT_CITY);
  const [inputCity, setInputCity] = useState(DEFAULT_CITY);
  const [loading, setLoading] = useState(true);
  const [citydata, setcitydata] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState("");
  useEffect(async () => {
    setLoading(true);
    try {
      await fetchData(DEFAULT_CITY);
    } catch (e) {
      setError("Unable to fetch weather please try again");
    }
    setLoading(false);
  }, []);
  const fetchData = async (cityName) => {
    const apiurl =
      "https://api.openweathermap.org/data/2.5/forecast?units=Metric&q=";
    const apikey = "1fdad893284d0362335e64043fd7b94e";
    try {
      const data = await fetch(apiurl + `${cityName}` + `&appid=${apikey}`);
      const json = await data.json();
      if (json.cod === "404") {
        throw new Error();
      }
      setcitydata(json);
    } catch (e) {
      window.alert(`Invalid city ${cityName}`);
    }
  };
  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };
  if (loading) {
    return <Shimmer />;
  }

  const convertTemperature = (temperature) => {
    return isCelsius ? temperature : (temperature * 9) / 5 + 32;
  };
  if (!citydata) {
    return null;
  }
  let temperature = convertTemperature(citydata?.list?.[0]?.main?.temp) || "NA";
  if (citydata.list[0].weather[0].main === "Clouds") {
    var image_link = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
  }

  if (citydata.list[0].weather[0].main === "Snow") {
    image_link = "https://cdn-icons-png.flaticon.com/512/6363/6363108.png";
  }
  if (citydata.list[0].weather[0].main === "Mist") {
    image_link = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png";
  }
  if (citydata.list[0].weather[0].main === "Rain") {
    image_link = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
  }
  if (citydata.list[0].weather[0].main === "Clear") {
    image_link = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
  }
  if (citydata.list[0].weather[0].main === "Fog") {
    image_link = "https://cdn-icons-png.flaticon.com/512/2910/2910189.png";
  }
  return (
    <div className="body-container">
      <div className="main-card">
        <div className="search-bar">
          <input
            type="search"
            className="inputFeild"
            onChange={(e) => {
              setInputCity(e.target.value);
            }}
            value={inputCity}
          />
          <Button
            shape="circle"
            className="search-btn"
            icon={<SearchOutlined />}
            style={{ margin: "7px" }}
            onClick={() => {
              if (inputCity) {
                setcity(inputCity);
                fetchData(inputCity);
              }
            }}
          />
        </div>

        <div className="main-weather">
          <img className="cloud" src={image_link} />
        </div>
        <div className="temp">
          {temperature}°{isCelsius ? "C" : "F"}
        </div>
        <div className="city-name">
          {citydata.city.name},{citydata.city.country}
        </div>
        <div className="city-weather">{citydata.list[0].weather[0].main}</div>

        <div className="toggle">
          <Switch
            onChange={toggleTemperature}
            checkedChildren="°C"
            unCheckedChildren="°F"
          />
        </div>
        <div className="wind-humid">
          <div className="humid-elements">
            <img
              className="humidity"
              src=" https://cdn-icons-png.flaticon.com/512/7052/7052976.png"
            />
            <div className="humid-data">
              <div className="humid-percentage">
                {citydata.list[0].main.temp_min}°C
              </div>
              <div className="text">Min-Temp.</div>
            </div>
          </div>
          <div className="humid-elements">
            <img
              className="wind"
              src="https://cdn-icons-png.flaticon.com/512/7052/7052976.png"
            />
            <div className="wind-data">
              <div className="wind-speed">
                {citydata.list[0].main.temp_max}°C
              </div>
              <div className="text">Max-Temp.</div>
            </div>
          </div>
        </div>
        <div className="wind-humid">
          <div className="humid-elements">
            <img
              className="humidity"
              src=" https://cdn-icons-png.flaticon.com/512/481/481453.png"
            />
            <div className="humid-data">
              <div className="humid-percentage">
                {citydata.list[0].main.humidity}%
              </div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="humid-elements">
            <img
              className="wind"
              src="  https://cdn-icons-png.flaticon.com/512/959/959711.png"
            />
            <div className="wind-data">
              <div className="wind-speed">
                {citydata.list[0].wind.speed}Km/h
              </div>
              <div className="text">Wind</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-container">
        {DAY_WISE_INDEX.map((dayIndex) => (
          <Card key={dayIndex} data={citydata.list[dayIndex]} />
        ))}
      </div>
    </div>
  );
};

export default Body;

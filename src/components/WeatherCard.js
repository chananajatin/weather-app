import React from "react";

const Card = (props) => {
  const { data } = props;
  const timestamp = data.dt;
  const date = new Date(timestamp * 1000);
if (data.weather[0].main === "Clouds") {
  var image = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
}

if (data.weather[0].main === "Snow") {
  image = "https://cdn-icons-png.flaticon.com/512/6363/6363108.png";
}
if (data.weather[0].main === "Mist") {
  image = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png";
}
if (data.weather[0].main === "Rain") {
  image = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
}
if (data.weather[0].main === "Clear") {
  image = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
}
if (data.weather[0].main === "Fog") {
  image = "https://cdn-icons-png.flaticon.com/512/2910/2910189.png";
}
  return (
    <div className="date-data">
      <div className="image">
        <img
          className="humidity"
          src={image}
        />
      </div>
      <div>
        <div className="date-temp">{data.main.temp}°C</div>
        <div className="date">{date.toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default Card;

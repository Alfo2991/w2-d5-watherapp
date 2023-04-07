import React, { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
const [data, setData] = useState({
celsius: 10,
name: "London",
humidity: 18,
speed: 2,
image: "/images/clouds.png",
});
const [name, setName] = useState("");
const [error, setError] = useState("");

const handleClick = () => {
if (name !== "") {
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5486b01d6d00e2240f7508e3402b1f71&units=metric`;
fetch(apiUrl)
.then((res) => res.json())
.then((res) => {
let imagePath = "";
if (res.weather[0].main == "Clouds") {
imagePath = "/images/clouds.png";
} else if (res.weather[0].main == "Clear") {
imagePath = "/images/clear.png";
} else if (res.weather[0].main == "Drizzle") {
imagePath = "/images/drizzle.png";
} else if (res.weather[0].main == "Rain") {
imagePath = "/images/rain.png";
} else if (res.weather[0].main == "Mist") {
imagePath = "/images/mist.png";
} else {
imagePath = "/images/clouds.png";
}

      setData({
        ...data,
        celsius: res.main.temp,
        name: res.name,
        humidity: res.main.humidity,
        speed: res.wind.speed,
        image: imagePath,
      });
    })
    .catch((err) => {
      if (err.response.status == 404) {
        setError("Invalid City Name");
      } else {
        setError("");
      }
      console.log(err);
    });
}
};
return (
<div className="container">
<div className="weather">
<div className="search">
<input
type="text"
placeholder="Enter City Name"
onChange={(e) => setName(e.target.value)}
/>
<button>
{" "}
<img src="/images/search.png" alt="search" onClick={handleClick} />{" "}
</button>
</div>

    <div className="error">
      <p>{error}</p>
    </div>
    <div className="weatherInfo">
      <img src={data.image} alt="" className="" />
      <h1>{Math.round(data.celsius)}°C</h1>
      <h2>{data.name}</h2>
      <div className="details">
        <div className="col">
          <img src="/images/humidity.png" alt="" />
          <div className="humidity">
            <p>{Math.round(data.humidity)}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col">
          <img src="/images/wind.png" alt="" />
          <div className="wind">
            <p>{Math.round(data.speed)}Km/h</p>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
}
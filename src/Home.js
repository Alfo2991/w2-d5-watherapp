import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState({
    celsius: 10,
    name: "London",
    humidity: 18,
    speed: 2,
    image: ''
  });
  const [name, setName] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5486b01d6d00e2240f7508e3402b1f71&units=metric`;
      axios.get(apiUrl)
        .then(res => {
            let imagePath= '';
       
          setData({ ...data,  celcius: res.data.main.temp,  name: res.data.name,   humidity: res.data.main.humidity, speed: res.data.wind.speed})
    })
        .catch((err) => console.log(err));
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
            <img
              src="/images/search.png"
              alt="search"
              onClick={handleClick}
            />{" "}
          </button>
        </div>
        <div className="weatherInfo">
          <img src="/images/mist.png" alt="" />
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

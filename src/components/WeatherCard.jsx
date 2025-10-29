// import React from 'react'
// function degToCompass(num) {
// const val = Math.floor(num / 22.5 + 0.5)
// const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
// return arr[val % 16]
// }


// export default function WeatherCard({ data }) {
// // data: { temperature, windspeed, winddirection, weathercode, time }
// const { temperature, windspeed, winddirection, weathercode, time } = data


// // Simplified mapping for weathercode to description (Open-Meteo codes)
// const weatherDescription = mapWeatherCode(weathercode)


// return (
// <div className="card">
// <div className="card-left">
// <div className="temp">{Math.round(temperature)}°C</div>
// <div className="desc">{weatherDescription}</div>
// </div>
// <div className="card-right">
// <div className="row"><strong>Wind:</strong> {windspeed} km/h ({degToCompass(winddirection)})</div>
// <div className="row"><strong>Obs time:</strong> {new Date(time).toLocaleString()}</div>
// </div>
// </div>
// )
// }


// function mapWeatherCode(code) {

// const mapping = {
// 0: 'Clear sky',
// 1: 'Mainly clear',
// 2: 'Partly cloudy',
// 3: 'Overcast',
// 45: 'Fog',
// 48: 'Depositing rime fog',
// 51: 'Light drizzle',
// 53: 'Moderate drizzle',
// 55: 'Dense drizzle',
// 61: 'Slight rain',
// 63: 'Moderate rain',
// 65: 'Heavy rain',
// 80: 'Rain showers',
// 95: 'Thunderstorm',
// }
// return mapping[code] || 'Unknown'
// }


import React from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiDayFog,
  WiThunderstorm,
  WiSnow,
  WiCloudyWindy,
} from "react-icons/wi";

function degToCompass(num) {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];
  return arr[val % 16];
}

export default function WeatherCard({ data }) {
  const { temperature, windspeed, winddirection, weathercode, time } = data;

  const weatherDescription = mapWeatherCode(weathercode);
  const WeatherIcon = getWeatherIcon(weathercode);

  return (
    <div className="card">
      <div className="card-left">
        <div className="icon">
          <WeatherIcon size={80} color="white" />
        </div>
        <div className="temp">{Math.round(temperature)}°C</div>
        <div className="desc">{weatherDescription}</div>
      </div>
      <div className="card-right">
        <div className="row">
          <strong>Wind:</strong> {windspeed} km/h ({degToCompass(winddirection)})
        </div>
        <div className="row">
          <strong>Time:</strong> {new Date(time).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

function mapWeatherCode(code) {
  const mapping = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Snow fall",
    80: "Rain showers",
    95: "Thunderstorm",
  };
  return mapping[code] || "Unknown";
}

function getWeatherIcon(code) {
  if ([0, 1].includes(code)) return WiDaySunny;
  if ([2, 3].includes(code)) return WiCloud;
  if ([45, 48].includes(code)) return WiDayFog;
  if ([51, 53, 55, 61, 63, 65, 80].includes(code)) return WiRain;
  if ([71].includes(code)) return WiSnow;
  if ([95].includes(code)) return WiThunderstorm;
  return WiCloudyWindy;
}

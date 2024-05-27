import "./Weather.css";
import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useEffect, useState } from "react";


export default function Weather() {

  let [showInfo, setShowInfo] = useState({});

  useEffect( sideEffect, [] );       // the first time this component is rendered, show the client's current location
  function sideEffect() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( showClientLocationWeather, handleError );
    } else {
      handleError("geolocation api not avaliable in the client's browser");
    }
  }

  async function showClientLocationWeather(position) {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${import.meta.env.VITE_APP_WEATHER_API_KEY}&units=metric`);
    let toShow = {...response.data.main, weather: response.data.weather[0].description, city: response.data.name };
    setShowInfo(toShow);
  }

  function handleError(error) {        // the case when during the 'first' rendering, the client's location is unavailable to us
    setShowInfo("error");
  }

  return (
    <div className="container Weather">
      <h1>
        Weather App
      </h1>
      <SearchBox setShowInfoFunc={setShowInfo} />
      <InfoBox weatherInfo={showInfo}/>
    </div>
  )
} 
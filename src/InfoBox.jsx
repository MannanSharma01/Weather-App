import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import LightModeIcon from '@mui/icons-material/LightMode';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import "./InfoBox.css";

const HOT_URL = "/images/hot.avif";
const COLD_URL = "/images/cold.avif";
const SNOW_URL = "/images/snow.avif";
const RAINY_URL = "/images/rainy.avif";
  

function InfoBox({weatherInfo}) {

  let imageURL;

  if(weatherInfo.humidity>80) imageURL = RAINY_URL;
  else if(weatherInfo.temp>20) imageURL = HOT_URL;
  else if(weatherInfo.temp<=20 && weatherInfo.temp>=0) imageURL=COLD_URL;
  else imageURL = SNOW_URL;

  return weatherInfo.city ?
    <Card sx={{ maxWidth: 345 }} className='InfoBox'>
      <CardMedia
        sx={{ height: 160 }}
        image= {imageURL}
        title="weather-image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='heading'>
          <span>{weatherInfo.city.toUpperCase()}</span> {
            weatherInfo.humidity>80? <ThunderstormIcon className='icon'/> : (weatherInfo.temp>20? <LightModeIcon className='icon'/>: <AcUnitIcon className='icon'/>)
          }
        </Typography>
        <Typography variant="body2" color="text.secondary" className="weather-details">
          Temperature: {weatherInfo.temp}&deg;C <br />
          Max Temp : {weatherInfo.temp_max}&deg;C <br />
          Min Temp : {weatherInfo.temp_min}&deg;C <br />
          Humidity: {weatherInfo.humidity}% <br /> <br />
          The weather can be described as <i>{weatherInfo.weather}</i>, & feels like {weatherInfo.feels_like}&deg;C
        </Typography>
      </CardContent>
    </Card>
    :
    weatherInfo === "error" ?     
    <h3 className="error">Your current location couldn't be accessed. Kindly search for a city.</h3> : /** for the 'first' rendering, in the case when the client's location is unavailable to us */
    null           /**in the case when the client enters an invalid city---(weatherInfo is an empty object) */

}

export default InfoBox;
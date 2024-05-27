import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import "./SearchBox.css";
import ErrorIcon from '@mui/icons-material/Error';

const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?";  //q={city name}&appid={API key}


export default function SearchBox({setShowInfoFunc}) {

  let [userEntry, setUserEntry] = useState("");
  let [isErr, setIsErr] = useState(false);
  let [validationFail, setValidationFail] = useState(false);      // for client-side validation(when client tries to submit 'no' city)


  //-------------------event handlers--------------------------------
  function handleChange(evt) {
    setUserEntry(evt.target.value);
  }


  async function handleFormSubmission(evt) {
    evt.preventDefault();

    if(userEntry.trim() === "") {
      setValidationFail(true);
    }

    else {
      setValidationFail(false);
      setUserEntry("");          // to empty the input box after the client submits the form

      try {
        let response = await axios.get(`${WEATHER_API_URL}q=${userEntry}&appid=${WEATHER_API_KEY}&units=metric`);

        if(isErr) setIsErr(false);        //( btw, writing an if condition here, not mandatory)
        let toShow = {...response.data.main, weather: response.data.weather[0].description, city: userEntry};
        setShowInfoFunc(toShow);
      } catch(err) {                  // when the client searches for an 'invalid' city
        if(!isErr) setIsErr(true);
        setShowInfoFunc({});
      }
    }
  }
  //----------------------------------------------------------------------------------

  return (
      <form onSubmit={handleFormSubmission} className='SearchBox' noValidate>
        {
          validationFail?
          <TextField error id="city" label="City Name is mandatory" variant="outlined" value={userEntry} onChange={handleChange}/> :
          <TextField id="city" label="City Name" variant="outlined" value={userEntry} onChange={handleChange}/> 
        }
        <br /><br />
        <Button variant="contained" type="submit">Search</Button>
        { isErr ? <div className='mt-5'><h3>Oops!! No such city found.</h3><ErrorIcon className="icon"/></div>: null }
      </form>
  );
}
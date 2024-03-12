import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [lat, lon] = country.latlng;
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env["VITE_WEATHER_API_KEY"];

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
      .then(res => setWeather(res.data));
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        capital {country.capital[0]}
        <br />
        area {country.area}
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <div>
        <h2>Weather in {country.capital}</h2>
        {weather &&
        <div>
          <div>temperature {weather.main.temp} Celcius</div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <div>wind {weather.wind.speed} m/s</div>
        </div>}
      </div>
    </div>
  )
}
export default Country;
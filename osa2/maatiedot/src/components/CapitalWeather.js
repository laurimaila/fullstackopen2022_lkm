import { useEffect, useState } from "react";
import axios from "axios";

const CapitalWeather = ({ city }) => {
    const api_key = 'poistettu'
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
            .then((response) => {
                setWeather(response.data);
            });
    }, []);

    return (
        <>
            {weather.main ? (
                <div>
                    <h3>Weather in {city}</h3>
                    <div>Temperature {weather.main.temp} Celcius</div>
                    <img
                        alt="weather icon"
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    />
                    <div>Wind {weather.wind.speed} m/s</div>
                </div>
            ) : null}
        </>
    );
};

export default CapitalWeather;
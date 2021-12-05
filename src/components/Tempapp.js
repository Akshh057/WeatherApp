import React, { useState } from 'react';
import "./CSS/style.css";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import axios from 'axios';

const Tempapp = () => {

    const [data, setData] = useState({
        city: {},
        country: {},
        weather: {},
        name: '',
        fetching: true
    });
    const [search, setSearch] = useState(""); //112173060a86fb43967cc14bc0b6d40b

    const fetchApi = async () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=112173060a86fb43967cc14bc0b6d40b`
        const response = await axios.get(url);
        response.data && setData((prevState) => {
            return {
                ...prevState,
                city: response.data.main,
                country: response.data.sys,
                weather: response.data.weather[0],
                name: response.data.name,
                fetching: false
            }
        })


    }
    const check = (e) => {
        if (e.target.value.length === 0) {
            setData((prevState) => {
                return {
                    ...prevState,
                    city: {},
                    country: {},
                    name: '',
                    fetching: true
                }
            })
        }
        setSearch(
            e.target.value
        )

    }
    return (
        <>
            <div className="main__div">
                <h1 className="heading">
                    Weather
                </h1>
                <div className="temp__div">
                    <div className="input__data">
                        <input type="text" className="input__field"
                            value={search}
                            onChange={check}
                        />
                        <button onClick={search.length > 0 ? fetchApi : null} className="searchBtn">
                            Search
                        </button>
                    </div>
                    {data.fetching === true ? (
                        <p > Please Enter City Name!</p>
                    ) : (
                        <div className="temp__info">
                            <div className="icons">
                                {/* <WbSunnyIcon /> */}
                                {<img src={`http://openweathermap.org/img/wn/${data.weather.icon}@2x.png`} alt="Weather Icon" />}
                            </div>
                            <h1 className="temp__location">
                                <LocationOnOutlinedIcon /> {data.name}
                            </h1>
                            <h2 className="temp">
                                {data.city.temp}° Cel
                            </h2>
                            <h3>
                                Country: {data.country.country}
                            </h3>
                            <h4 className="tempmin__max">
                                Min :{data.city.temp_min} | Max : {data.city.temp_max}
                            </h4>
                        </div>

                    )}
                    <footer> Made with ❤️ by Akshat</footer>
                </div>
            </div>
        </>
    )
}

export default Tempapp

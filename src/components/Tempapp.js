import React, { useEffect, useState } from 'react';
import "./CSS/style.css";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CloudIcon from '@material-ui/icons/Cloud';

const Tempapp = () => {
    // const [temp, setTemp] = useState(null);

    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [search, setSearch] = useState("Mumbai"); //112173060a86fb43967cc14bc0b6d40b
    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=112173060a86fb43967cc14bc0b6d40b`
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(
                resJson.main
            );
            setCountry(
                resJson.sys
            )

        }
        fetchApi();
    }, [search])
    const check = (e) => {
        setSearch(
            e.target.value
        )

    }
    return (
        <>
            <div className="main__div">
                <h1>
                    Weather App
            </h1>
                <div className="temp__div">
                    <div className="input__data">
                        <input type="search" className="input__field"
                            defaultValue=""
                            value={search}
                            onChange={check}
                        />
                    </div>
                    {!city || !country ? (
                        <p> Please Enter Correct City!</p>
                    ) : (
                            <div className="temp__info">
                                <div className="icons">
                                    <WbSunnyIcon />
                                    {/* <CloudIcon style={{ marginLeft: "10px" }} /> */}
                                </div>
                                <h1 className="temp__location">
                                    <LocationOnOutlinedIcon /> {search}
                                </h1>
                                <h2 className="temp">
                                    {city.temp}° Cel
                                </h2>
                                <h3>
                                    Country: {country.country}
                                </h3>
                                <h4 className="tempmin__max">
                                    Min :{city.temp_min} | Max : {city.temp_max}
                                </h4>
                            </div>

                        )}
                </div>
            </div>
        </>
    )
}

export default Tempapp

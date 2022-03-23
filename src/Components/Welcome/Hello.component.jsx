import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hello(props) {
    const { cityList, setCityList, handleAddCity } = props;

    const suggestions = ["Tel Aviv", "Budapest", "Rome"]
    const navigate = useNavigate()
    useEffect(() => {
        if (cityList.length) navigate('/')
    }, [cityList])

    return (<div className="welcome">
        <h1>What is your city?</h1>

        {suggestions.map(itm => <div key={itm} className="city-suggestion button" onClick={() => handleAddCity(itm)}>{itm}</div>)}
    </div>
    );
}

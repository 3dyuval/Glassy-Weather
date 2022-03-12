import React, { useEffect, useState } from "react";
import useWeatherIcons from "../../Hooks/useWeatherIcons"


function CurrentWeatherCondition() {

    const icon = useWeatherIcons();

    const [graphic, setGraphic] = useState('graphic')

    useEffect(() => {
        setGraphic(icon)
    }, [])

    return <div className="CurrentWeatherCondition"><img src={graphic}></img></div>;
}

export default CurrentWeatherCondition
import React from 'react'
import City from '../../Components/City'
import { CITIES_EXAMPLES } from "../../constants"


function CitiesExample() {


    return (
        CITIES_EXAMPLES.map(city => {
            return <City>{city.name}</City>
        })
    )
}

export default CitiesExample
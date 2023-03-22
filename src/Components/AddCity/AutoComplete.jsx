// create a react compononent
// this component is used to display the list of cities
// when the user types in the search box
// and the list of cities is displayed in the dropdown
// when the user clicks on the city
// the city is added to the list of cities
// and the list of cities is displayed in the dropdown

//city data : https://datahub.io/core/world-cities#data

import React, { useEffect, useState, useContext } from "react"
import { CitiesContext } from "../../contextReducers";
import worldCities from './world-cities.json';
import { useNavigate, useLocation } from "react-router-dom";

export default function AutoComplete(props) {
    const { input } = props;

    const [userCitySelected, setUserCitySelected] = useState("")
    const [filteredCities, setFilteredCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [cityList, setCityList] = useState(worldCities)
    const { cities } = useContext(CitiesContext)
    const navigate = useNavigate()
    let { pathname } = useLocation()
    useEffect(() => {
        if (!input) return
        let list = []
        let i = 0;
        setIsLoading(true)
        cityList.forEach(city => {
            if (city.name.toLowerCase().includes(input.toLowerCase())) {
                i++
                if (i > 15) return
                list.push(city.name)
            }
        })
        if (input.length === 0) {
            setFilteredCities([])
        } else {
            setFilteredCities([...cities.map(c => c.name), ...list])
        }
        setIsLoading(false)
    }, [input])

    // Navigate to cities from user's list
    //Do not show world-cities.json matches if they are on the user's list
    function handleItemClick(item) {
        navigate(`weather/${item}`)
    }

    return (<>
        <div className="auto-complete">
            <strong>Search results for: {input}</strong>
            <AutoCompleteResults
                cities={filteredCities}
                onClick={handleItemClick}
                selected={userCitySelected}
                isError={isError}
                isLoading={isLoading}
            />
        </div>
    </>)
}


export function AutoCompleteResults({ cities, selected, isError, isLoading, onClick }) {

    return <ul>
        {isLoading && <li> Loading...</li>}
        {isError && <li>Error...</li>}
        {
            (cities.length !== false) && cities.map((city, idx) => {
                return <li
                    key={idx}
                    className={`list-item " ${(selected === city) ? " selected" : ""}`}
                    onClick={() => onClick(city)}>{city}
                </li>
            })
        }
    </ul >

}
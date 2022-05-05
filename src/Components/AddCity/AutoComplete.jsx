// create a react compononent
// this component is used to display the list of cities
// when the user types in the search box
// and the list of cities is displayed in the dropdown
// when the user clicks on the city
// the city is added to the list of cities
// and the list of cities is displayed in the dropdown

//city data : https://datahub.io/core/world-cities#data
import React, { useEffect, useState } from "react"

export default function AutoComplete(props) {
    const { input, setInput } = props;

    const [userCitySelected, setUserCitySelected] = useState("")
    const [filteredCities, setFilteredCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [cityList, setCityList] = useState([])

    const handleUserInput = (event) => {
        setInput(event.target.value)
    }

    useEffect(() => {
        const fetchCityList = async () => {
            const response = await fetch("src/assets/data/world-cities.json")
            const data = await response.json()
            setCityList(data)
            setIsLoading(false)
        }
        fetchCityList()
    }, [])

    useEffect(() => {
        let list = []
        let i = 0;
        cityList.forEach(city => {
            if (city.name.toLowerCase().includes(input.toLowerCase())) {
                i++
                if (i > 15) return
                list.push(city.name)
                setIsLoading(false)
            }
            setFilteredCities(list)
        })
    }, [input])


    return (<>
        <div className="auto-complete">
            <input className="search" type="text"
                placeholder="Type in city name"
                value={input}
                onChange={e => {
                    setIsLoading(true)
                    handleUserInput(e)
                }}></input>
            <ul>
                {filteredCities.map((city) => {
                    return <li className={`list-item " ${(userCitySelected === city) ? " selected" : ""}`} key={city} onClick={() => {
                        setUserCitySelected(city)
                        setInput(city)
                        setFilteredCities([])
                    }}>{city}</li>
                })}
                {isLoading && <li>Loading...</li>}
                {isError && <li>Error...</li>}
            </ul>
        </div>
    </>)
}

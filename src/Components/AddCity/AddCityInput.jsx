import { useState } from 'react'
import { useGetWeather } from '../../Hooks/useGetWeather'
import { notifyUser } from "../../Utils"

function AddCityInput({ dispatch, citiesActions }) {
    const { fetchUrl } = useGetWeather()

    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleButtonClick(event) {
        event.preventDefault()
        if (!input) return
        setIsLoading(true)
        try {
            const url = fetchUrl(input)
            fetch(url)
                .then(response => response.json())
                .then(parsed => {
                    dispatch({ type: citiesActions.ADD_CITY, payload: parsed.location.name, })
                    notifyUser(`${parsed.location.name} added`)
                })
        }
        catch (err) {
            notifyUser(`${err}`)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="add-city">
            {isLoading && '<div>Loading...</div>'}
            <form onSubmit={handleButtonClick}>
                <label htmlFor="city-name">City name</label>
                <input
                    type="text"
                    id="city-name"
                    placeholder="Enter City Name"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                />
                <input type="submit" value="Add City" />
            </form>
        </div >
    )
}

export default AddCityInput
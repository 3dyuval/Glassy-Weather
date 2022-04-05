import { useState } from 'react'
import axios from 'axios'
import { notifyUser } from "../../Utils"

function AddCityInput({ dispatch, citiesActions }) {

    const [input, setInput] = useState("")


    function handleButtonClick(event) {
        event.preventDefault()
        if (!input) return

        try {
            axios.get(`http://localhost:8000/city/${input}`)
                .then(response => {
                    dispatch({ type: citiesActions.ADD_CITY, payload: response.data.location.name, })
                    notifyUser(`${response.data.location.name} added`)
                })
        }
        catch (err) {
            notifyUser(`${err}`)
            console.error(err)
        }
        finally {
            // setLoading(false)
        }
    }

    return (
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
    )
}

export default AddCityInput
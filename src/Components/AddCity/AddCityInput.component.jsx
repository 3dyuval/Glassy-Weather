import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-tiny-toast"

function AddCityInput(props) {

    const { cities, setCities } = props;

    const [input, setInput] = useState("")

    function handleButtonClick(event) {
        event.preventDefault()
        if (!input) return

        try {
            axios.get(`http://localhost:8000/${input}`)
                .then(response => {
                    setCities([...cities, {
                        id: cities.length,
                        name: response.data.location.name
                    }]
                    )
                    toast.show(`${response.data.location.name} added`, { timeout: 3000 })
                })
        }
        catch (err) {
            toast.show(`${err}`, { timeout: 2000 })
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
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-tiny-toast"
import useStorage from '../../Hooks/useStorage'

function AddCityInput({ handleAddCity }) {

    const { addCity } = useStorage();

    const [input, setInput] = useState("")

    function handleButtonClick(event) {
        event.preventDefault()
        if (!input) return
        // setLoading(true)

        try {
            axios.get(`http://localhost:8000/${input}`)
                .then(response => {
                    const added = addCity(response.data.location.name)
                    handleAddCity(added)
                    toast.show(`${response.data.location.name} added`)
                })
        }
        catch (err) {
            toast.show(`${err}`)
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
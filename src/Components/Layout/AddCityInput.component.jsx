import React, { useState } from 'react'

function AddCityInput({ handleAddCity }) {

    const [input, setInput] = useState("")

    function handleButtonClick(event) {
        event.preventDefault()
        if (!input) {
            return
        }
        handleAddCity(input)
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
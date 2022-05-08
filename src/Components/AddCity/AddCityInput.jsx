import { useState } from 'react'
import AutoComplete from './AutoComplete'
import { useAddCity } from '../../Hooks'
// import { useAddCity } from '../../Hooks'

function AddCityInput() {

    const [input, setInput] = useState("")
    const { addCity, isLoading } = useAddCity()

    function handleButtonClick(event) {
        event.preventDefault()
        if (!input) return
        addCity(input)
    }

    return (
        <div className="add-city">
            {isLoading && '<div>Loading...</div>'}
            <form onSubmit={handleButtonClick}>
                <label htmlFor="city-name">City name</label>
                <AutoComplete input={input} setInput={setInput} />
                <input type="submit" value="Add City" />
            </form>
        </div >
    )
}

export default AddCityInput
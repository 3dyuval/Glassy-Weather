import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAddCity } from '../../Hooks'
import Search from './Search'

function AddCity() {

    const [input, setInput] = useState("")
    const { addCity } = useAddCity()
    let [searchParams, setSearchParams] = useSearchParams()

    function handleAddCity(event) {
        event.preventDefault()
        if (!input) return
        addCity(input)
    }

    useEffect(() => {
        setSearchParams({ layout: 'Header', component: 'AddCity', filter: input })
    }, [input])

    return <Search input={input} setInput={setInput} onClick={handleAddCity} />
}

export default AddCity
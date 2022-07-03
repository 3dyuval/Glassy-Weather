import React from 'react'
import { useSearchParams } from 'react-router-dom'
import AutoComplete from '../AddCity/AutoComplete'

function SearchResults({ input }) {


    return (<>
        <div>Search results for <strong>{input}</strong></div>
        <AutoComplete input={input} />
    </>
    )
}

export default SearchResults
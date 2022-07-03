import React from 'react'

function Search(props) {
    const { onClick, input, setInput } = props;

    return (


        <form className="add-city-form" onSubmit={onClick}>
            <label htmlFor="city-name"></label>
            <input type="text"
                placeholder="Search City"
                className="search" value={input}
                onChange={e => setInput(e.target.value)}
            // onBlur={() => navigate(location.pathname)} 
            />
            <input type="submit" value="Add City" className="btn-primary btn-add-city" />

        </form>
    )
}

export default Search
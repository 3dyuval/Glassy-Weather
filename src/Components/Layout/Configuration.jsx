import React from 'react'

function Configuration(props) {

    const { darkTheme, handleThemeToggle } = props;



    return (<ul>
        <li> <button onClick={handleThemeToggle} >{darkTheme ? 'Dark mode' : 'light Mode'}</button></li>
        <li>two</li>
        <li>three</li>
    </ul>)

}



export default Configuration

import React from 'react'

function Configuration(props) {

    const { config, handleUserConfig, darkMode, setDarkMode } = props;

    if (!config) return null
    return (<ul>
        <li> <button onClick={() => handleUserConfig({ settings: { darkMode: !config.settings.darkMode } })} >{darkMode ? 'Dark mode' : 'light Mode'}</button></li>
        <li>two</li>
        <li>three</li>
    </ul>)

}



export default Configuration

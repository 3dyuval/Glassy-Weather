import React, { useEffect } from 'react'
import { useGetWeather } from '../../Hooks/useGetWeather'
import ConfigItem from './ConfigItem';

function Configuration(props) {

    const { getWeather, weather } = useGetWeather()
    const { config, dispatch } = props;

    useEffect(() => {
        getWeather("Rome")
    }, [])

    function handleToggleSwitch(e) {
        dispatch({ type: 'toggle', payload: { statName: e.target.value, checked: e.target.checked } })
    }

    if (!weather) return 'Loading configuration...'

    return (<ul className="config">
        {/* <li> <button onClick={() => setConfig({ settings: { darkMode: !config.settings.darkMode } })} >{darkMode ? 'Dark mode' : 'light Mode'}</button></li> */}
        {weather.stats.map(itm => {
            return (
                <ConfigItem
                    key={itm.statName}
                    statName={itm.statName}
                    checked={config.stats.some(configStat => configStat.statName === itm.statName)}
                    onToggle={handleToggleSwitch}
                />
            )
        })}
    </ul>)

}
export default Configuration
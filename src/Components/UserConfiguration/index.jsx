import React, { useEffect, useContext } from 'react'
import { useGetWeather } from '../../Hooks/useGetWeather'
import ConfigItem from '../ConfigItem';
import { ConfigContext } from '../../contextReducers'

function UserConfiguration() {

    const { fetchWeather, weather } = useGetWeather()
    const cfg = useContext(ConfigContext)

    useEffect(() => {
        fetchWeather("Rome")
    }, [])

    if (!weather) return 'Loading configuration...'

    return (<ul className="config">
        <ConfigItem
            type="button"
            name={cfg.userConfig.settings.darkMode ? 'Dark mode' : 'light Mode'}
            checked={cfg.userConfig.settings.darkMode}
            onClick={() => cfg.dispatchUserConfig({ type: 'darkMode' })}
            value="toggle Dark Mode"
        />
        {weather.stats.map(itm => {
            return (
                <ConfigItem
                    type="checkbox"
                    key={itm.statName}
                    name={itm.statName}
                    className="toggleStat"
                    statName={itm.statName}
                    onChange={e => cfg.dispatchUserConfig({ type: 'toggle', payload: { statName: e.target.value, checked: e.target.checked } })}
                    checked={cfg.userConfig.stats.some(configStat => configStat.statName === itm.statName)}
                />
            )
        })}
    </ul>)

}
export default UserConfiguration
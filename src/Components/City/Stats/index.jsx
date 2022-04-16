import { useContext, useEffect, useState } from 'react'
import { ConfigContext } from "../../../contextReducers"

export default function Stats({ stats }) {

  const [userConfiguratedFilteredStats, setFilteredStats] = useState([])
  const [toggleAllStats, setToggleAllStats] = useState(false)
  const cfg = useContext(ConfigContext)

  useEffect(() => {
    const updatedFiltered = cfg.userConfig.stats.map(o => {
      const found = stats.find(obj => obj.statName === o.statName)
      return { ...o, statValue: found ? found.statValue : '' }
    })
    setFilteredStats(updatedFiltered)
  }, [stats])

  return <div className="stats">
    <button onClick={() => {
      setToggleAllStats(!toggleAllStats)
    }}>show All Available Stats</button>

    <ViewStats statsList={toggleAllStats ? stats : userConfiguratedFilteredStats} />
  </div>
}


function ViewStats({ statsList }) {

  return statsList.map(st => {
    return <div
      key={`stat-${st.statName}`}
      className="stat"
      id={st.statName}
      alt={st.statName}
      title={st.statName}
    >
      <span className="stat-name">{st ? st.statName : "stat"}</span>
      <span className="stat-value">{st.statValue}</span>
    </div>
  })

}
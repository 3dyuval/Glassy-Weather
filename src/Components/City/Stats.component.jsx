
export default function Stats({ stats, layoutName }) {


  return <div className={layoutName} alt={layoutName}>
    {stats && stats.map(st =>
    (
      <div
        key={`stat-${st.statName}`}
        className="stat"
        id={st.statName}
        alt={st.statName}
        title={st.statName}
      >
        <div className="nameContainer">
          <span className="name">{st ? st.statName : "stat"}</span>
        </div>
        <div className="valueContainer">
          <span className="value">{st.statValue}</span>
          <span className="unit"></span>
        </div>
      </div>
    )
    )}
  </div>
}
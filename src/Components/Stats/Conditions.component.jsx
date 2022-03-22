import "../../SCSS/Stats.scss";

export default function Conditions({ conditions, layoutName }) {


  return <div className={layoutName} alt={layoutName}>
    {conditions && conditions.map(condition =>
    (
      <div
        key={`stat-${condition.statName}`}
        className="stat"
        id={condition.statName}
        alt={condition.statName}
        title={condition.statName}
      >
        <div className="nameContainer">
          <span className="name">{condition ? condition.statName : "stat"}</span>
        </div>
        <div className="valueContainer">
          <span className="value">{condition.statValue}</span>
          <span className="unit"></span>
        </div>
      </div>
    )
    )}
  </div>
}
import { useSpring, animated as a } from "react-spring"
import "../../SCSS/Stats.scss";

export default function Stats({ weatherStats }) {


  return <div className="stats">
    {console.log(weatherStats)}
    {weatherStats.map(({ statName, statValue }) =>
      <Stat
        statName={statName}
        statValue={statValue}
        key={`stat-${statName}`}
      />
    )}
  </div>
}

function Stat({ statName, statValue }) {


  return (
    <div
      className="stat"
      id={statName}
      alt={statName}
      title={statName}
    >
      <div className="nameContainer">
        <span className="name">{statName ? statName : "stat"}</span>
      </div>
      <div className="valueContainer">
        <span className="value">{statValue}</span>
        <span className="unit"></span>
      </div>
    </div>
  )
}

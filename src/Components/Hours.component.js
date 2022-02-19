import React from "react"
import Hour from "./Hour"
import { animated as a, useTrail } from "react-spring"

export default function Hours({ hours, isLoading }) {

  const mock = [...Array(12)].map(() => {   // empty [obj] for empty boxes
    const o = { hour: "00:00", condition: { icon: null }, temp_c: 0 }
    return o
  })

  function mapHours(data) {
    return data.map((hour, index) => <Hour isLoading={isLoading} hour={hour} key={`hour${index}`} />)
  }

  if (isLoading) return <HoursAnimation isLoading={isLoading}>{mapHours(mock)}</HoursAnimation>
  return <HoursAnimation isLoading={isLoading}>{mapHours(hours)}</HoursAnimation>
}

function HoursAnimation({ children, isLoading }) {
  const hours = React.Children.toArray(children)
  const [trail, api] = useTrail(hours.length,
    () => ({
      from: { opacity: 1 },
      to: { opacity: 0.25 },
      loop: true,
    })
  )

  if (!isLoading) {
    api.start({ opacity: 1, })
  }

  return (
    <div className="hours">
      {trail.map((styles, index) => <a.div key={index} style={styles}>{hours[index]}</a.div>)}
    </div>
  )
}

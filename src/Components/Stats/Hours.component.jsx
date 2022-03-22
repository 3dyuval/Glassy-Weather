import React, { useEffect } from "react"
import Hour from "./Hour"
import { animated as a, useTrail, useTransition } from "react-spring"
import "../../SCSS/Hours.scss"

export default function Hours({ isLoading, hours }) {

  const mock = Array.from({ length: 12 }, ((item, idx) => {
    // empty [obj] for empty boxes
    return {
      time: roundMinutes(new Date()) + idx,
      condition: { icon: null },
      temp_c: 0
    }
  })
  )

  function roundMinutes(dateObject) {
    return dateObject.getHours() + Math.round(dateObject.getMinutes() / 60)
  }

  function mapData(arr) {
    return arr.map((hour, index) => <Hour isLoading={isLoading} hour={hour} key={`hour${index}`} />)
  }

  if (isLoading || !hours) return <MockHours isLoading={isLoading}>{mapData(mock)}</MockHours>
  return <MockHours isLoading={isLoading}>{mapData(hours)}</MockHours>
}

function HoursAnimation({ children, isLoading }) {
  const hours = React.Children.toArray(children)

  const [transition, api] = useTransition(hours, () => ({
    from: { opacity: 0.25 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    trail: 25
  }))



  return (<div className="hours">

    {transition((style, item) => (
      <a.div style={style}>
        {item}
      </a.div>
    ))}
  </div>)
}

function MockHours({ children, isLoading }) {
  const hours = React.Children.toArray(children)
  const [trail, api] = useTrail(hours.length,
    () => ({
      from: { opacity: 1 },
      to: { opacity: 0.25 },
      loop: true,
      easing: 'easings.easeInOutQuart',
    })
  )

  useEffect(() => {
    if (!isLoading) {
      api.start({ opacity: 1 })
    }
  }, [isLoading])


  return (
    <a.div className="hours">
      {trail.map((styles, index) => <a.div key={index} style={styles}>{hours[index]}</a.div>)}
    </a.div>
  )
}

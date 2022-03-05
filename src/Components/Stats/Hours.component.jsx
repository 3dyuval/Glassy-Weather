import React from "react"
import Hour from "./Hour"
import { animated as a, useTrail, useTransition, useSpring } from "react-spring"
import useWeather from "../../Hooks/useWeather"
import "../../SCSS/Hours.scss"

export default function Hours({ hours, isLoading }) {
  const { mockHours } = useWeather()

  function mapHours(data) {
    return data.map((hour, index) => <Hour isLoading={isLoading} hour={hour} key={`hour${index}`} />)
  }

  if (isLoading) return <MockHours isLoading={isLoading}>{mapHours(mockHours())}</MockHours>
  return <HoursAnimation isLoading={isLoading}>{mapHours(hours)}</HoursAnimation>
}

function HoursAnimation({ children, isLoading }) {
  const hours = React.Children.toArray(children)

  const transition = useTransition(hours, {
    from: { opacity: 0.25 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    trail: 25
  })

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

  if (!isLoading) {
    api.start({ opacity: 1 })
  }

  return (
    <a.div className="hours">
      {trail.map((styles, index) => <a.div key={index} style={styles}>{hours[index]}</a.div>)}
    </a.div>
  )
}

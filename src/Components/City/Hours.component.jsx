import React from "react"
import Hour from "./Hour.component"
import { dummyHours } from "../../Utils"

import { LoadingAnimation, LoadedAnimation } from "./Hours.animation";

function Hours(props) {
  const { animate, hours } = props

  function mapHours(arr) {
    return arr.map((hour, index) => <Hour animate={animate} hour={hour} key={`hour${index}`} />)
  }

  if (animate || !hours) return <LoadingAnimation animate={animate}>{mapHours(dummyHours)}</LoadingAnimation>
  return <LoadedAnimation animate={animate}>{mapHours(hours)}</LoadedAnimation>
}

export default Hours
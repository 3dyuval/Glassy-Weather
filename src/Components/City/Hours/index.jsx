import React from "react"
import Hour from "./Hour"
import { dummyHours } from "../../../utils"

import { LoadingAnimation, LoadedAnimation } from "./HoursAnimation";

function Hours(props) {
  const { animate, hours } = props

  function mapHours(arr) {
    return arr.map((hour, index) => <Hour animate={animate} index={index} hour={hour} key={`hour${index}`} />)
  }

  if (animate || !hours) return <LoadingAnimation animate={animate}>{mapHours(dummyHours)}</LoadingAnimation>
  return <LoadedAnimation animate={animate}>{mapHours(hours)}</LoadedAnimation>
}

export default Hours
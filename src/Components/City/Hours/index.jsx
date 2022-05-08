import React from "react"
import Hour from "./Hour"
import { dummyHours } from "../../../utils"

import { LoadingAnimation, LoadedAnimation } from "./HoursAnimation";

function Hours(props) {
  const { loading, hours } = props

  if (loading || !hours) {
    return (
      <LoadingAnimation>
        {dummyHours.map((hour, idx) => <Hour loading={true} hour={hour} key={`hour${idx}`} />)}
      </LoadingAnimation>
    )
  } else {
    return <LoadedAnimation>
      {hours.map((hour, idx) => <Hour loading={false} hour={hour} key={`hour${idx}`} />)}
    </LoadedAnimation>
  }
}

export default Hours
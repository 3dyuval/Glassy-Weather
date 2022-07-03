import React, { useContext } from 'react'
import { CitiesContext } from '../../../contextReducers'
import { format } from "date-fns"
import { useSpring, animated as a } from "react-spring"
import { getGraphic, dayOrNight, dummyHours } from "../../../utils"

function Hour({ hour, index }) {
    const { time, condition, temp_c } = hour || dummyHours[index]

    const { isLoading } = useContext(CitiesContext)
    const animatedTemp = useSpring({
        from: { value: 0 },
        to: { value: !isLoading ? temp_c : 0 },
        config: { damping: 2, tension: 50 }
    })

    // const timeValue = (index === 0) ? 'NOW' : format(new Date(time), "HH:mm")
    const timeValue = format(new Date(time), "HH:mm")
    return (
        <div className='hour'>
            <div className="time">{timeValue || dummyHours}</div>
            <div className="hour-container">
                <img className="icon" src={getGraphic(condition.code, true, dayOrNight(time))} style={{ opacity: isLoading ? 0 : 1 }} />
                {/* <a.div className="temp-txt" style={{ opacity: isLoading ? 0 : 1 }}>{animatedTemp.value.to(n => n.toFixed(1))}</a.div> */}
                {/* To disable the text animation just uncomment */}
                <div>{temp_c}</div>
            </div>
        </div>
    )
}

export default Hour
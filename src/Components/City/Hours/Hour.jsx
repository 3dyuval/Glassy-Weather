import React from 'react'
import { format } from "date-fns"
import { useSpring, animated as a } from "react-spring"
import { getGraphic } from "../../../utils"

function Hour({ hour, animate, index }) {
    const { time, condition, temp_c } = hour
    const animatedTemp = useSpring({
        from: { value: 0 },
        to: { value: !animate ? temp_c : 0 },
        config: { damping: 2, tension: 50 }
    })


    // const timeValue = (index === 0) ? 'NOW' : format(new Date(time), "HH:mm")
    const timeValue = format(new Date(time), "HH:mm")
    const dayOrNight = (new Date(time).getHours() > 6 && new Date(time).getHours() < 18) ? true : false
    console.log(dayOrNight)
    return (
        <div className='hour'>
            <div className="time">{timeValue}</div>
            <div className="hour-container">
                <img className="icon" src={getGraphic(condition.code, true, dayOrNight)} style={{ opacity: animate ? 0 : 1 }} />
                <a.div className="temp-txt" style={{ opacity: animate ? 0 : 1 }}>{animatedTemp.value.to(n => n.toFixed(1))}</a.div>
                {/* To disable the text animation just uncomment */}
                {/* <div>{temp_c}</div> */}
            </div>
        </div>
    )
}

export default Hour
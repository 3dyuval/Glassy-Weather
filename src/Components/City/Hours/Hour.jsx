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


    const timeValue = (index === 0) ? 'NOW' : format(new Date(time), "HH:mm")

    return (
        <div className='hour'>
            <div className="time">{timeValue}</div>
            <div className="hour-container">
                <img className="icon" src={getGraphic(condition.code)} style={{ opacity: animate ? 0 : 1 }} />
                <div>{temp_c}</div>
                {/* <a.div className="temp-txt" style={{ opacity: animate ? 0 : 1 }}>{animatedTemp.value.to(n => n.toFixed(1))}</a.div> */}
            </div>
        </div>
    )
}

export default Hour
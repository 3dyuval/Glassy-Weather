import React from 'react'
import { format } from "date-fns"
import { useSpring, animated as a } from "react-spring"

function Hour({ hour, isLoading }) {

    const { time, condition, temp_c } = hour

    function formatTemperature(n) {
        return Number.parseFloat(n).toFixed(2)
    }

    const animatedTemp = useSpring({
        from: { value: 0 },
        to: { value: !isLoading ? temp_c : '0.00' },
        config: { round: 1.0, damping: 1, tension: 15 * temp_c }
    })

    const timeValue = time ? format(new Date(time), "HH:mm") : ''

    return (
        <div className='hour'>
            <div className="time">{timeValue}</div>
            <div className="rounded-box">
                <img className="icon" src={condition.icon} style={{ opacity: isLoading ? 0 : 1 }} />
                <a.div className="temp-txt" style={{ opacity: isLoading ? 0 : 1 }}>{animatedTemp.value}</a.div>
            </div>
        </div>
    )
}

export default Hour
import React, { useState, useEffect } from "react";
import { animated as a, useTransition } from "react-spring"

function BackgroundAnimation({ animate, graphic }) {

    const [show, setShow] = useState(false)

    const transition = useTransition(show, {
        from: { transform: "translateY(500px)", opacity: 0 },
        enter: { transform: "translateY(0px)", opacity: 1 },
        leave: { transform: "translateY(500px)", opacity: 0 },
        reset: true,
        onRest: () => setShow(true),
        delay: 500,
    })

    useEffect(() => {
        setShow(true)
    }, [graphic])

    return (<>
        {transition((style, item) => <a.div style={style} >
            <img className="background-graphic" src={graphic}></img>
        </a.div >)}
    </>)

}

export default BackgroundAnimation
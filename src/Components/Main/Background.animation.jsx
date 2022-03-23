import React, { useState, useEffect } from "react";
import { animated as a, useTransition } from "react-spring"
import "./SCSS/Background.Animation.scss"

function BackgroundAnimation({ animate, graphic }) {

    const [show, setShow] = useState(false)

    const transition = useTransition(show, {
        from: { y: 1000, opacity: 0 },
        enter: { y: -250, opacity: 1 },
        leave: { y: 1000, opacity: 0 },
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
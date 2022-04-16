import React, { useState, useEffect } from "react";
import { animated as a, useTransition } from "react-spring"
import "./BackgroundAnimation.scss"
import { createPortal } from "react-dom"

function Animation({ show, setShow, graphic }) {


    const transition = useTransition(show, {
        from: { transform: "translate(50vw, 150vh) scale(300%)", opacity: 0 },
        enter: { transform: "translate(50vw, 69vh) scale(300%)", opacity: 1 },
        leave: { transform: "translate(50vw, 150vh) scale(300%)", opacity: 0 },
        reset: true,
        onRest: () => setShow(true),
        delay: 500,
    })

    return transition((style, item) => <a.div style={{ position: 'absolute', transformOrigin: 'center', ...style }} >
        <img className="background-graphic" src={graphic}></img>
    </a.div >)
}



function BackgroundAnimation({ graphic }) {

    const [show, setShow] = useState(false)
    const bgRoot = document.getElementById('bg-root')

    useEffect(() => {
        setShow(true)
    }, [graphic])


    return (
        createPortal(<Animation show={show} setShow={setShow} graphic={graphic} />, bgRoot)
    )
}

export default BackgroundAnimation
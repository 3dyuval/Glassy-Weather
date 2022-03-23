import React, { useEffect } from "react"
import { animated as a, useTrail, useTransition } from "react-spring"

function LoadedAnimation({ children, animate }) {

    const [transition, api] =
        useTransition(React.Children.toArray(children),
            () => ({
                from: { opacity: 0.25 },
                enter: { opacity: 1 },
                leave: { opacity: 0 },
                trail: 25
            }))

    return (<div className="hours">

        {transition((style, item) => (
            <a.div style={style}>
                {item}
            </a.div>
        ))}
    </div>)
}

function LoadingAnimation({ children, isLoading }) {
    const hours = React.Children.toArray(children)
    const [trail, api] = useTrail(hours.length,
        () => ({
            from: { opacity: 1 },
            to: { opacity: 0.25 },
            loop: true,
            delay: 1500,
            easing: 'easings.easeInOutQuart',
        })
    )

    useEffect(() => {
        if (!isLoading) {
            api.start({ opacity: 1 })
        }
    }, [isLoading])


    return (
        <a.div className="hours">
            {trail.map((styles, index) => <a.div key={index} style={styles}>{hours[index]}</a.div>)}
        </a.div>
    )
}


export { LoadingAnimation, LoadedAnimation }
import React from "react"
import { animated as a, useTrail, useTransition } from "react-spring"

function Loaded({ children }) {

    const [transition, api] =
        useTransition(React.Children.toArray(children),
            () => ({
                from: { opacity: 0.25 },
                enter: { opacity: 1 },
                leave: { opacity: 0 },
                trail: 25,
                reset: true,
                onRest: () => { api.start({ opacity: 1 }) }

            }))

    return (<div className="hours">

        {transition((style, item) => (
            <a.div style={style}>
                {item}
            </a.div>
        ))}
    </div>)
}

function Loading({ children }) {
    const hours = React.Children.toArray(children)
    const [trail, api] = useTrail(hours.length,
        () => ({
            from: { opacity: 0.75 },
            to: { opacity: 0.25 },
            loop: true,
            delay: 100,
            easing: 'easings.easeInOutQuart',
            // onRest: () => { api.start({ opacity: 1 }) }
        })
    )

    return (
        <a.div className="hours">
            {trail.map((styles, index) => <a.div key={index} style={styles}>{hours[index]}</a.div>)}
        </a.div>
    )
}

const memoLoading = React.memo(Loading)
const memoLoaded = React.memo(Loaded)


export {
    memoLoading as LoadingAnimation,
    memoLoaded as LoadedAnimation
}
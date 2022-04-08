import { roundMinutes } from "./roundMinutes";

const DUMMY_HOURS_MULTIPLIER = 12;


// empty [obj] for empty boxes
export const dummyHours = (
    Array.from(
        { length: DUMMY_HOURS_MULTIPLIER }, ((item, idx) => {
            return {
                time: roundMinutes(new Date()) + idx,
                condition: { icon: null },
                temp_c: 0
            }
        })
    )
)
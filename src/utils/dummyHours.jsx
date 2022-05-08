import { roundMinutes } from "./roundMinutes";

const DUMMY_HOURS_MULTIPLIER = 12;


// empty[obj] for empty boxes
const dummyHours = (
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


// let dummyHours = []

// for (let i = 0; i < DUMMY_HOURS_MULTIPLIER; i++) {
//     dummyHours.push(
//         {
//             time: roundMinutes(new Date()) + i,
//             condition: { icon: null },
//             temp_c: 0
//         }
//     )
// }

export { dummyHours }
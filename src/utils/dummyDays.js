const DUMMY_DAYS_MULTIPLIER = 3;

export const dummyDays = (
    Array.from(
        { length: DUMMY_DAYS_MULTIPLIER }, ((item, idx) => {
            return {
                name: 'Day',
                date: idx
            }
        })
    )
)
export const dayOrNight = (time) => {
    if (new Date(time).getHours() > 6 && new Date(time).getHours() < 18) return true
    return false
}


export function roundMinutes(dateObject) {
    return dateObject.getHours() + Math.round(dateObject.getMinutes() / 60)
}
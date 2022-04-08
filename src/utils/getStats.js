
//only returns the stats without nested objects
export function getStats(obj) {

    let list = []
    for (const property in obj) {
        if (typeof obj[property] !== 'object') {
            list.push({
                statName: property,
                statValue: obj[property]
            })
        }
    }
    return list
}
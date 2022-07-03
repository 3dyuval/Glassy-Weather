import UserConfiguration from "../../Components/UserConfiguration"
import AddCity from "../../Components/AddCity"

export function Components({ render }) {
    if (!render) return null
    const Component = components[render]
    return <Component />
}

const components = {
    UserConfiguration: UserConfiguration,
    AddCity: AddCity,
}

export default components
import { format } from "date-fns"

const colors = {

    byTime(time) {
        if (!time) {
            time = new Date()
        }
        const hour = format(new Date(time), "HH")
        let color = colors.colorTypes.light1
        //dawn
        // 6, 7
        if (hour >= 6 && hour <= 7) {
            color = colors.colorTypes.light2
        }
        // day
        //  8 -  14
        else if (hour >= 8 && hour <= 14) {
            color = colors.colorTypes.light1
        }
        //afternoon
        //  15 -  18
        else if (hour >= 15 && hour <= 18) {
            color = colors.colorTypes.light2
        }
        //evening
        // 16 - 19,
        else if (hour >= 16 && hour <= 19) {
            color = colors.colorTypes.dark1
        }
        //night
        // 20 - 5, 
        else if (hour >= 20 && hour <= 24 || hour <= 5) {
            color = colors.colorTypes.dark2
        }
        return color
    },

    setStyleSheet(url) {

        //generate a css style sheet node from url
        const cssNode = (url) => {
            const domElement = document.createElement('link')
            domElement.setAttribute("rel", "stylesheet")
            domElement.setAttribute("type", "text/css")
            domElement.setAttribute('id', 'colorMode')
            domElement.setAttribute("href", url)
            return domElement
        }

        const applyCSS = () => {
            //remove previous node
            const prev = document.getElementById('colorMode')
            if (prev) {
                prev.remove()
            }
            //new stylesheet node
            const node = cssNode(url)
            //append updated node to body
            document.getElementsByTagName('head')[0].appendChild(node)
        }
        applyCSS()
    }


}


colors.colorTypes = {
    light1: { hex: "#EFF7FF", name: "light1", url: '/src/assets/colors/light.css' },
    light2: { hex: "#D5DCEC", name: "light2", url: '/src/assets/colors/light.css' },
    dark1: { hex: "#6B84AE", name: "dark1", url: '/src/assets/colors/dark.css' },
    dark2: { hex: "#384153", name: "dark2", url: '/src/assets/colors/dark.css' }
}


export { colors }
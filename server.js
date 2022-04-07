const express = require('express')
const cors = require('cors')
const path = require('path')
const fetch = require('node-fetch')

require('dotenv').config()

const app = express()
app.use(cors())

// serve static assets if in production
app.use(express.static('dist'))
app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    next()
})


app.get('/city/:city', async (req, res) => {
    const data = await fetchWeather(req.params.city)
    res.json(data)
})

const fetchWeather = async (cityName) => {
    try {
        if (typeof cityName === 'object') throw new Error('city name is not ok')
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${cityName}&days=3&aqi=no&alerts=no`)
        const weatherJson = await response.json()
        return weatherJson
    }
    catch (error) {
        console.log("fetch did not work", error)
    }
}

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is listening at port: ${process.env.PORT || 8000}`)
})
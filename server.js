const express = require('express')
const cors = require('cors')
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs');

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    next()
})


app.get('/city/:city', async (req, res, next) => {
    const data = await fetchApi(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${req.params.city}&days=3&aqi=no&alerts=no`)
    res.json(data)
    next()
})


const fetchApi = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log("fetch did not work", error)
    }
}

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is listening at port: ${process.env.PORT || 8000}`)
})
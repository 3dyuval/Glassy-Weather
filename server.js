const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')
const port = 8000
require('dotenv').config()

const app = express()
app.use(cors())

app.listen(port, () => {
    console.log(`server is listening at port: ${port || 8000}`)
})

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    })
}

app.get('/city/:city', (req, res) => {
    const options = {
        method: "GET",
        url: `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${req.params.city}&days=3&aqi=no&alerts=no`
    }
    axios.request(options)
        .then(response => {
            return new Promise((resolve, reject) => {
                if (response.status !== 200) reject(`response status: ${response.status}`)
                resolve(res.json(response.data))
            })
        }).catch(error => {
            return error
        })

})
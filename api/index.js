const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.listen(PORT, () => {
    console.log(`server is listening at port: ${PORT}`)
})

app.get('/city/:city', (req, res) => {

    const options = {
        method: "GET",
        url: `http://api.weatherapi.com/v1/forecast.json?key=${process.env.VITE_API_KEY}&q=${req.params.city}&days=3&aqi=no&alerts=no`
    }

    axios.request(options)
        .then(response => {
            return new Promise((resolve, reject) => {
                if (response.status === 200) resolve(res.json(response.data))
                if (response.status !== 200) reject(`response status: ${response.status}`)
            })
        })
})
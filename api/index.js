const port = process.env.PORT
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.listen(port, () => {
    console.log(`server is listening at port: ${port || 8000}`)
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'))
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

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
        }).catch(error => {
            return error
        })

})
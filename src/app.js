const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Setup directory to serve
app.use(express.static(publicDir))

app.get((''), (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Johnny Black'
    })
})

app.get(('/about'), (req, res) => {
    res.render('about', {
        title: 'About me',
        name : 'Johnny Black'
    })
})

app.get(('/help'), (req, res) => {
    res.render('help', {
        message: 'This is a Help Session',
        title: 'Help',
        name: 'Johnny Black'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.address, (err, {latitude, longtitude, location} = {}) => {
        if (err) {
            return res.send(err)
        }
        forecast(longtitude, latitude, (err, forecastData) => {
            if (err) {
                return res.send(err)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        name: 'Johnny Black',
        errorMessage: 'Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        name: 'Johnny Black',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
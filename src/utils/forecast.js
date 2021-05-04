const request = require('request')

const forecast = (y, x, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7773d15b261fcda1fba45f7f1a6737b6&query=' + x + ',' + y + '&unit=f'
    request({url, json: true}, (err, { body }) => {
        if(err){
            callback('Unable to connect to weather service', undefined)
        } else if(body.err) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degree. But it feels like ${body.current.feelslike} out here`)
        }
    })
}
module.exports = forecast
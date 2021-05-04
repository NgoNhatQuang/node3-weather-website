const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9obm55YmxhY2s0MDIzIiwiYSI6ImNrbzU3YWZ1NjBocWgycHBoMTBmbWFmb2UifQ.vUWrEFRKnaVMscLIqovfpQ&limit=1'

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to Map Box', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
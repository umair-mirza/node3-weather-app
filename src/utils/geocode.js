const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVuaXNlaGlsdG9uIiwiYSI6ImNrYXphZ3M0dzBhajUyeXBpcWcyaXBoZ3AifQ.5_DgfiJko0c9C_3X-6JrGA&limit=1';

    request({url, json: true}, (error, response) => {
        const {features} = response.body;
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode;
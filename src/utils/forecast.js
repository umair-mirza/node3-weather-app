const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b65e09efb0d620289e9da51a6ae255b9&query=' + latitude + ',' + longitude + '&units=m';

    request({url, json: true}, (error, response) => {
        const {success, current} = response.body;
        if (error) {
            callback('Unable to connect to Weather service', undefined);
        } else if (success === false) {
            callback('Unable to find the given location. Please try again', undefined);
        } else {
            callback(undefined, current.weather_descriptions[0] + ". It is currently " + current.temperature + " degrees out and it feels like " + current.feelslike + " degrees. The humidity is " + current.humidity + "%");
        }
    })
}

module.exports = forecast;
const request = require('request') 
// const geocode = require('./utilities/geocode')

// Weather forecast



const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/7a5ef72fd4fe98cc7ae3cdb76569f7c3/' + latitude + ',' + longitude + '?units=si'
  
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to the weather services !', undefined)
    } else if (body.error) {
      callback('Unable to find location, try another search !', undefined)
    } else {
      callback(undefined, body.currently.summary + '. It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of '+ body.daily.data[0].temperatureLow + '. There is a ' +body.currently.precipProbability + '% chance of rain.')
    }
  })
}


module.exports = forecast
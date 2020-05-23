const request = require('request')

const forecast = (lat,long,callback) =>{
    const url='https://api.darksky.net/forecast/085abccfe29724fcf4834c5d3ad7565a/' + lat + ',' + long+'?units=si'

    request( { url : url ,json:true} , ( error , response ) => {
        if(error){
            callback('unable to connect to location services,',undefined)
        }else if(response.body.error){
            callback('unable to connect to location services,',undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary + ' It is currently '+ response.body.currently.temperature + 
                 ' degrees out. There is ' + response.body.currently.precipProbability+ '% chance of rain.')
        }
    
})

}

module.exports = forecast
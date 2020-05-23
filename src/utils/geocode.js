const request = require('request')

const geocode = (address,callback)=>{
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZmV5c2FuZCIsImEiOiJja2FiNGtwM3YwN3FkMnJxeTNsN29jYnprIn0.DI1eRuw_uw6D1aSEyqmDLg&limit=1'

    request( {url: geocodeURL,json:true},(error,response)=>{
        if(error){
            callback('unable to connect location services.',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('unable to find location',undefined)        
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })}
        })
}

module.exports = geocode

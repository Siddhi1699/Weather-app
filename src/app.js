const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'address not provided'
        })
    }

    geocode(req.query.address , (error , {latitude,longitude,location} = {} ) => {
        if(error){
            res.send({error})
        }
        
        forecast(latitude,longitude, (error , fdata) => {
            if(error){
                res.send({error})
            }

            res.send({
                forecast: fdata,
                location,
                address: req.query.address
            })
        })
        
    })


})

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Siddhi Belgamwar'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Weather',
        name: 'Siddhi Belgamwar',
        desc: 'This app provides weather forecast'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Weather help',
        name: 'Siddhi Belgamwar',
        desc: 'Enter the location and click search for forecast.'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        desc: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        desc: 'Page not found'
    })
})



app.listen(port ,() => {
    console.log('server is up on port '+port)
})
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

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
        name: 'Siddhi'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Weather',
        name: 'Siddhi',
        desc: 'This page is about weather'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Weather help',
        name: 'Siddhi',
        desc: 'This page is for help'
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



app.listen(3000 ,() => {
    console.log('server is up on port 3000')
})
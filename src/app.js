const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 //for Heroku's port

const hbs =require('hbs')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//after installing hbs library
app.set('view engine','hbs')
app.set('views',viewsPath)

//node will first look for the requested page in the specified publicDirectoryPath in app.use...else it wil look in views
app.use(express.static(publicDirectoryPath))

//register the path to partials directory
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    // res.send('<h1>Home Page</h1>')
    res.render('index',{
        title: 'Weather App',
        name: 'Zainab'
    })
})
app.get('/about',(req,res)=>{
    // res.send('<h1>Home Page</h1>')
    res.render('about',{
        title: 'About',
        name: 'Zainab'
    })
})
app.get('/help',(req,res)=>{
    // res.send('<h1>Home Page</h1>')
    res.render('help',{
        title: 'Help',
        name: 'Zainab',
        errorMsg:'help not available'
        
    })
})
//we need to download the request module to access foreign APIs
const geocode= require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'you need to provide an address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        //the empty object assigned to the callback {} is the default value when the return value is undefined. If we don't do this the program crashes
        if(error){
            return res.send({ error: 'error in geocode '})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error: 'error in forecast'})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            
            });
        });
    });
    // res.send([{
    //     address: req.query.address,
    //     location: 'Mumbei',
    //     forecast: 'snowing lol'
    // }])
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'No search parameter provided'
        })
    }
    res.send({
        products: []
    })
    console.log(req.query)
})

app.get('/help/*',(req,res)=>{
    // res.send('Sorry we can not help you with this :/ ')
    res.render('404Page',{
        errorMsg:'404 - Sorry we can not help you with this :/  ',
        title: '404 Page',
        name:'zainab'
    })
})

app.get('*',(req,res)=>{
    // res.send('404 Page')
    res.render('404Page',{
        errorMsg:' Page Not Found',
        title: '404 Page',
        name:'zainab'
    })
})

app.listen(port,()=>{
    console.log('server running on port '+port)
})
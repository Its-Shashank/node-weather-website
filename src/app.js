// use expressjs.com and read the docs to learn more

const request = require('request')
const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// add express

const app = express()

// path.join gives us path to another folder as we can see in the second argumen.
// if we print __dirname the it will give the path to directory of app.js

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebars are yet to be understood.
// 2 lines below are setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Set the route
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Shashank Gaur'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me!',
    name: 'Shashank Gaur'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    cost: 'You just cannot imagine how much.',
    sexAppeal: 'Very High',
    title: 'Help',
    name: 'Shashank Gaur'
  })
})


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided.'
    })
  }


  // ES-6 default function parameter is used as we paas in an empty object
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
    
  })
  

})

app.get('/products', (req, res) => {

  // if we just make the search key compulsory we need to dump rest of the code in the else.
  
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  
  // queries are the key value pairs in url.
  // we can see those by dumping the req.query to the console.
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('errorHelp', {
    message: 'Help article not found!'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    message: 'Page not found!'
  })
})


// setting up localhost at port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
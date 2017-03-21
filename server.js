// https://restcountries.eu/
// https://restcountries.eu/rest/v2/all
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.json())
app.use(express.static('public'))

app.set('port', process.env.PORT || 8080)


app.get('/api/users', (req, res)=> {
  database('users').select()
  .then((users)=> {
    res.status(200).json(users)
  })
  .catch((error)=> {
    console.error(error)
  })
})

app.get('/api/countries', (req, res)=> {
  database('countries').select()
    .then((countries)=> {
      res.status(200).json(countries)
    })
    .catch((error)=> {
      console.error(error)
    })
})

app.get('/api/trips', (req, res)=> {
  database('trips').select()
    .then((trips)=> {
      res.status(200).json(trips)
    })
    .catch((error)=> {
      console.error(error)
    })
})


if(!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log('Magic is running on 8080')
  })
}

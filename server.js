// https://restcountries.eu/
// https://restcountries.eu/rest/v2/all

// const http = require('http')
// const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static('public'))

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

app.get('/api/users/:id', (req, res)=> {
  database('users').where('id', req.params.id).select()
  .then((user)=> {
    res.status(200).json(user)
  })
  .catch((error)=> {
    console.error(error)
  })
})

app.get('/api/countries/:id', (req, res)=> {
  database('countries').where('id', req.params.id).select()
    .then((country)=> {
      res.status(200).json(country)
    })
    .catch((error)=> {
      console.error(error)
    })
})

app.get('/api/trips/:id', (req, res)=> {
  database('trips').where('id', req.params.id).select()
    .then((trip)=> {
      res.status(200).json(trip)
    })
    .catch((error)=> {
      console.error(error)
    })
})

app.post('/api/users', (req, res)=> {
  const user = { name: req.body.name, created_at: new Date }
  database('users').insert(user)
    .then(()=> {
      database('users').select()
        .then((users)=> {
          res.status(200).json(users)
        })
        .catch((error)=> {
          console.log(error)
        })
    })
})

app.post('/api/countries', (req, res)=> {
  const country = { name: req.body.name, created_at: new Date }
  database('countries').insert(country)
    .then(()=> {
      database('countries').select()
        .then((countries)=> {
          res.status(200).json(countries)
        })
        .catch((error)=> {
          console.log(error)
        })
    })
})

app.post('/api/trips', (req, res)=> {
  const trip = { country_id: req.body.country_id , user_id: req.body.user_id , created_at: new Date }
  database('trips').insert(trip)
    .then(()=> {
      database('trips').select()
        .then((trips)=> {
          res.status(200).json(trips)
        })
        .catch((error)=> {
          console.log(error)
        })
    })
})

app.patch('/api/users/:id', (req, res)=> {
  const { id } = req.params
  database('users').where('id', id).select()
    .then((user)=> {
      let userName = req.body.name
      database('users').where('id', id).select().update({ name: userName })
        .then((users)=> {
          res.status(200).json(users)
        })
    })
    .catch((error)=> {
      console.log(error)
    })
})

app.patch('/api/countries/:id', (req, res)=> {
  const { id } = req.params
  database('countries').where('id', id).select()
    .then((country)=> {
      let countryName = req.body.name
      database('countries').where('id', id).select().update({ name: countryName })
        .then((countries)=> {
          res.status(200).json(countries)
        })
    })
    .catch((error)=> {
      console.log(error)
    })
})

app.patch('/api/trips/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('id', id).select()
    .then((trip)=> {
      let countryId = req.body.country_id
      database('trips').where('id', id).select().update({ country_id: countryId })
        .then((trips)=> {
          res.status(200).json(trips)
        })
    })
    .catch((error)=> {
      console.log(error)
    })
})

app.delete('/api/users/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('user_id', id).select()
    .then((trip)=> {
      database('trips').where('user_id', id).select().del()
        .then((user)=> {
          database('users').where('id', id).select().del()
            .then((users)=> {
              res.status(200).json(users)
            })
        })
    })
    .catch((error)=> {
      console.log(error)
    })
})

app.delete('/api/countries/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('country_id', id).select()
    .then((trip)=> {
      database('trips').where('country_id', id).select().del()
        .then((country)=> {
          database('countries').where('id', id).select().del()
            .then((countries)=> {
              res.status(200).json(countries)
            })
        })
    })
    .catch((error)=> {
      console.log(error)
    })
})

app.delete('/api/trips/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('id', id).select()
    .then((trip)=> {
      database('trips').where('id', id).select().del()
        .then((trips)=> {
          res.status(200).json(trips)
        })
    })
    .catch((error)=> {
      console.log(error)
    })
})

app.delete('/api/users/:tripId', (req, res)=> {
  const { id } = req.params
  database('trips').where('user_id', id).select()
    .then((trip)=> {
      database('trips').where('user_id', id).select().del()
        .then((trips)=> {
          res.status(200).json(trips)
        })
    })
    .catch((error)=> {
      console.log(error)
    })
})


// if(!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log('Magic is running on 8080')
  })
// }

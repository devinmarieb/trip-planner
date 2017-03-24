// https://restcountries.eu/ <-- for future datas
// https://restcountries.eu/rest/v2/all <-- for future datas

const bodyParser = require('body-parser')
const pg = require('pg');
const express = require('express')
const app = express()

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 8080)

//loads all users at root
// app.get('/', (req, res)=> {
//   database('countries').select()
//     .then((countries)=> {
//       res.status(200).json(countries)
//     })
//     .catch((error)=> {
//       console.error('The path you are trying to reach does not exist')
//     })
// })

//gets all users + check for user query param
//query param needs to be ?name='Devin%20Beliveau'
app.get('/api/users', (req, res)=> {
  let userQuery = req.query.name
  if(userQuery) {
    database('users').where('name', userQuery).select()
      .then((user)=> {
        res.status(200).json(user)
      })
    .catch((error)=> {
      console.error('The path you are trying to reach does not exist')
    })
  } else {
      database('users').select()
      .then((users)=> {
        res.status(200).json(users)
    })
      .catch((error)=> {
        console.error('The path you are trying to reach does not exist')
      })
    }
})

//gets all countries
app.get('/api/countries', (req, res)=> {
  database('countries').select()
    .then((countries)=> {
      res.status(200).json(countries)
    })
    .catch((error)=> {
      console.error('The path you are trying to reach does not exist')
    })
})

//gets all trips
app.get('/api/trips', (req, res)=> {
  database('trips').select()
    .then((trips)=> {
      res.status(200).json(trips)
    })
    .catch((error)=> {
      console.error('The path you are trying to reach does not exist')
    })
})

//gets a specific user
app.get('/api/users/:id', (req, res)=> {
  database('users').where('id', req.params.id).select()
  .then((user)=> {
    res.status(200).json(user)
  })
  .catch((error)=> {
    console.error('The user you are trying to find does not exist')
  })
})

//gets a specific country
app.get('/api/countries/:id', (req, res)=> {
  database('countries').where('id', req.params.id).select()
    .then((country)=> {
      res.status(200).json(country)
    })
    .catch((error)=> {
      console.error('Something is wrong with the request')
    })
})

//gets a specific trip
app.get('/api/trips/:id', (req, res)=> {
  database('trips').where('id', req.params.id).select()
    .then((trip)=> {
      res.status(200).json(trip)
    })
    .catch((error)=> {
      console.error('The trip you are trying to find does not exist')
    })
})

//gets all trips associated with a user
app.get('/api/trips/user/trips/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('user_id', id).select()
    .then((trips)=> {
      res.status(200).json(trips)
    })
    .catch((error)=> {
      console.error('Something is wrong with the request')
    })
})

//gets all trips associated with a country
app.get('/api/trips/country/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('country_id', id).select()
    .then((trips)=> {
      res.status(200).json(trips)
    })
  .catch((error)=> {
    console.error('Something is wrong with the request')
    })
})

//gets the number of trips associated with a user
app.get('/api/user/:id/trips', (req, res)=> {
  const { id } = req.params
  database('trips').where('user_id', id).select()
    .then((trips)=> {
      res.status(200).json(trips.length)
    })
  .catch((error)=> {
    console.error('Something is wrong with the request')
    })
})

//posts a new user
app.post('/api/users', (req, res)=> {
  const user = { name: req.body.name, created_at: new Date }
  database('users').insert(user)
    .then(()=> {
      database('users').select()
        .then((users)=> {
          res.status(200).json(users)
        })
        .catch((error)=> {
          console.log('Something is wrong with the request')
        })
    })
})

//posts a new country
app.post('/api/countries', (req, res)=> {
  const country = { name: req.body.name, created_at: new Date }
  database('countries').insert(country)
    .then(()=> {
      database('countries').select()
        .then((countries)=> {
          res.status(200).json(countries)
        })
        .catch((error)=> {
          console.log('Something is wrong with the request')
        })
    })
})

//posts a new trip
app.post('/api/trips', (req, res)=> {
  const trip = { country_id: req.body.country_id , user_id: req.body.user_id , created_at: new Date }
  database('trips').insert(trip)
    .then(()=> {
      database('trips').select()
        .then((trips)=> {
          res.status(200).json(trips)
        })
        .catch((error)=> {
          console.log('Something is wrong with the request')
        })
    })
})

//updates the name of a user
app.patch('/api/users/:id', (req, res)=> {
  const { id } = req.params
  database('users').where('id', id).select()
    .then((user)=> {
      let userName = req.body.name
      database('users').where('id', id).select().update({ name: userName })
        .then(()=> {
          database('users').where('id', id).select()
            .then((user)=> {
              res.status(200).json(user)
            })
        })
    })
    .catch((error)=> {
      console.log('Something is wrong with the request')
    })
})

//updates the name of a country
app.patch('/api/countries/:id', (req, res)=> {
  const { id } = req.params
  database('countries').where('id', id).select()
    .then((country)=> {
      let countryName = req.body.name
      database('countries').where('id', id).select().update({ name: countryName })
        .then(()=> {
          database('countries').where('id', id).select()
            .then((country)=> {
              res.status(200).json(country)
            })
        })
    })
    .catch((error)=> {
      console.log('Something is wrong with the request')
    })
})

//updates the country associated with the trip
app.patch('/api/trips/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('id', id).select()
    .then((trip)=> {
      let countryId = req.body.country_id
      database('trips').where('id', id).select().update({ country_id: countryId })
        .then(()=> {
          database('trips').where('id', id).select()
            .then((trip)=> {
              res.status(200).json(trip)
            })
        })
    })
    .catch((error)=> {
      console.log('Something is wrong with the request')
    })
})

//deletes a user
app.delete('/api/users/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('user_id', id).select()
    .then((trip)=> {
      database('trips').where('user_id', id).select().del()
        .then((user)=> {
          database('users').where('id', id).select().del()
            .then(()=> {
              database('users').where('id', id).select()
                .then((user)=> {
                  res.status(200).json(user)
                })
            })
        })
    })
    .catch((error)=> {
      console.log('Something is wrong with the request')
    })
})

//deletes a country
app.delete('/api/countries/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('country_id', id).select()
    .then((trip)=> {
      database('trips').where('country_id', id).select().del()
        .then((country)=> {
          database('countries').where('id', id).select().del()
            .then(()=> {
              database('countries').where('id', id).select()
                .then((country)=> {
                  res.status(200).json(country)
                })
            })
        })
    })
    .catch((error)=> {
      console.log('Something is wrong with the request')
    })
})

//deletes a trip
app.delete('/api/trips/:id', (req, res)=> {
  const { id } = req.params
  database('trips').where('id', id).select()
    .then((trip)=> {
      database('trips').where('id', id).select().del()
        .then(()=> {
          database('trips').where('id', id).select()
            .then((trip)=> {
              res.status(200).json(trip)
            })
        })
    })
    .catch((error)=> {
      console.log('Something is wrong with the request')
    })
})


if(!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log('Magic is running on 8080')
  })
}

module.exports = app

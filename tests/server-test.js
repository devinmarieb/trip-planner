process.env.NODE_ENV = 'test'

const chai = require('chai')
const expect = chai.expect
const should = chai.should
const assert = chai.assert
const chaiHttp = require('chai-http')
const app = require('../server.js')
chai.use(chaiHttp)

const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('Server should', ()=> {
  beforeEach(function(done) {
    database.migrate.rollback()
     .then(function() {
       database.migrate.latest()
       .then(function() {
           done()
       })
     })
  })

afterEach(function(done) {
  database.migrate.rollback()
  .then(()=> {
    done()
  })
})

  // happy / sad path test for get all users //
  describe('GET /api/users', ()=> {
    it('should return 200 with all users', (done)=> {
      chai.request(app)
      .get('/api/users')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/usres')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for get all countries
  describe('GET /api/countries', ()=> {
    it('should return 200 with all countries', (done)=> {
      chai.request(app)
      .get('/api/countries')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/cuontries')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for get all trips
  describe('GET /api/trips', ()=> {
    it('should return 200 with all trips', (done)=> {
      chai.request(app)
      .get('/api/trips')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/tirps')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for getting a specific user
  describe('GET /api/users/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              done()
            })
    })
    it('should return 200 with a specific user', (done)=> {
      chai.request(app)
      .get('/api/users/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(res.body[0].name).to.equal('Neville Longbottom')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/usres/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for getting a specific country
  describe('GET /api/countries/:id', ()=> {
    beforeEach(function(done){
      database('countries').insert({
              name: 'Canada',
              created_at: new Date
            }).then(function(){
              done()
            })
    })

    it('should return 200 with a specific country', (done)=> {
      chai.request(app)
      .get('/api/countries/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(res.body[0].name).to.equal('Canada')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/countreis/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for getting a specific trip
  describe('GET /api/trips/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              database('countries').insert({
                name: 'Aruba',
                created_at: new Date
              }).then(function(){
                database('trips').insert({
                  user_id: 1,
                  country_id: 1,
                  created_at: new Date
                }).then(function(){
                  done()
                })
              })
            })
    })
    it('should return 200 with a specific trip', (done)=> {
      chai.request(app)
      .get('/api/trips/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(res.body[0].country_id).to.equal(1)
        expect(res.body[0].user_id).to.equal(1)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/countreis/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for getting all trips associated with a user
  describe('GET /api/user/trips/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              database('countries').insert({
                name: 'Aruba',
                created_at: new Date
              }).then(function(){
                database('trips').insert({
                  user_id: 1,
                  country_id: 1,
                  created_at: new Date
                }).then(function(){
                  done()
                })
              })
            })
    })
    it('should return 200 with all trips for specific user', (done)=> {
      chai.request(app)
      .get('/api/user/1/trips')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(res.body).to.equal(1)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/trips/user/tirps/9')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for getting all trips associated with a country
  describe('GET /api/trips/country/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              database('countries').insert({
                name: 'Aruba',
                created_at: new Date
              }).then(function(){
                database('trips').insert({
                  user_id: 1,
                  country_id: 1,
                  created_at: new Date
                }).then(function(){
                  done()
                })
              })
            })
    })
    it('should return 200 with all trips for specific country', (done)=> {
      chai.request(app)
      .get('/api/trips/country/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(res.body[0].country_id).to.equal(1)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/trips/county/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path test for getting the number of trips associated with a user
  describe('GET /api/user/:id/trips', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              database('countries').insert({
                name: 'Aruba',
                created_at: new Date
              }).then(function(){
                database('trips').insert({
                  user_id: 1,
                  country_id: 1,
                  created_at: new Date
                }).then(function(){
                  database('trips').insert({
                    user_id: 1,
                    country_id: 1,
                    created_at: new Date
                  }).then(function(){
                    done()
                  })
                })
              })
            })
    })
    it('should return 200 number of trips for specific user', (done)=> {
      chai.request(app)
      .get('/api/user/1/trips')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(res.body).to.equal(2)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/trips/user/tirps/9')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for posting a new user
  describe('POST /api/users', ()=> {
    it('should post a new user', (done)=> {
      chai.request(app)
      .post('/api/users')
      .send({
        id: 31,
        name: 'Luna Lovegood'
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body).to.have.length(1)
        expect(res.body[0].name).to.equal('Luna Lovegood')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      const user = {
        name: 2,
        created_at: new Date
      }
      chai.request(app)
      .post('/api/user')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for posting a new country
  describe('POST /api/countries', ()=> {
    it('should post a new country', (done)=> {
      chai.request(app)
      .post('/api/countries')
      .send({
        id: 1,
        name: 'Canada'
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body[0].id).to.equal(1)
        expect(res.body[0].name).to.equal('Canada')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/user')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for posting a new trip
  describe('POST /api/trips', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              database('countries').insert({
                name: 'Aruba',
                created_at: new Date
              }).then(function(){
                    done()
                })
              })
    })
    it('should post a new trip', (done)=> {
      chai.request(app)
      .post('/api/trips')
      .send({
        id: 1,
        country_id: 1,
        user_id: 1
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body[0].id).to.equal(1)
        expect(res.body[0].country_id).to.equal(1)
        expect(res.body[0].user_id).to.equal(1)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/trpis')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for patching a user
  describe('PATCH /api/users/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Luna Lovegood',
              created_at: new Date
            }).then(function(){
              done()
            })
    })
    it('should edit a users name', (done)=> {
      chai.request(app)
      .patch('/api/users/1')
      .send({
        name: 'Luna Longbottom'
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body[0].name).to.equal('Luna Longbottom')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/usrs/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for patching a country
  describe('PATCH /api/countries/:id', ()=> {
    beforeEach(function(done){
      database('countries').insert({
              name: 'US Virgin',
              created_at: new Date
            }).then(function(){
              done()
            })
    })
    it('should edit a countries name', (done)=> {
      chai.request(app)
      .patch('/api/countries/1')
      .send({
        name: 'US Virgin Islands'
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body[0].name).to.equal('US Virgin Islands')
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/contries/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for patching a trip
  describe('PATCH /api/trips/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              database('countries').insert({
                name: 'Aruba',
                created_at: new Date
              }).then(function(){
                database('countries').insert({
                  name: 'Bermuda',
                  created_at: new Date
                }).then(function(){
                  database('trips').insert({
                    user_id: 1,
                    country_id: 2,
                    created_at: new Date
                  }).then(function(){
                    done()
                  })
                })
              })
            })
    })
    it('should edit a trips country id', (done)=> {
      chai.request(app)
      .patch('/api/trips/1')
      .send({
        country_id: 2,
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body[0].country_id).to.equal(2)
        expect(res.body[0].user_id).to.equal(1)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/contries/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for deleting a user
  describe('DELETE /api/users/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Severus Snape',
              created_at: new Date
            }).then(function(){
              done()
            })
    })
    it('should delete a user', (done)=> {
      chai.request(app)
      .delete('/api/users/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body).to.have.length(0)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/ursr')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for deleting a country
  describe('DELETE /api/counties/:id', ()=> {
    beforeEach(function(done){
      database('countries').insert({
              name: 'Hogwarts',
              created_at: new Date
            }).then(function(){
              done()
            })
    })
    it('should delete a country', (done)=> {
      chai.request(app)
      .delete('/api/countries/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body).to.have.length(0)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/countris/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for deleting a trip
  describe('DELETE /api/trip/:id', ()=> {
    beforeEach(function(done){
      database('users').insert({
              name: 'Neville Longbottom',
              created_at: new Date
            }).then(function(){
              database('countries').insert({
                name: 'Aruba',
                created_at: new Date
              }).then(function(){
                database('countries').insert({
                  name: 'Bermuda',
                  created_at: new Date
                }).then(function(){
                  database('trips').insert({
                    user_id: 1,
                    country_id: 2,
                    created_at: new Date
                  }).then(function(){
                    done()
                  })
                })
              })
            })
    })
    it('should delete a trip', (done)=> {
      chai.request(app)
      .delete('/api/trips/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body).to.have.length(0)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .post('/api/trpis/1')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })


})

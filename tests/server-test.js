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
   const users = [
     { name: 'Albus Dumbledore' },
     { name: 'Severus Snape' }
   ]

   const countries = [
     { name: 'Canada'},
     { name: 'Mexico'}
   ]

   const trips = [
     { country_id: 1, user_id: 1 },
     { country_id: 2, user_id: 2 }
   ]

   database.schema.dropTable('trips')
   .then(_ => database.schema.dropTable('countries'))
   .then(_ => database.schema.dropTable('users'))
   .then(function() {
       database.schema.createTable('users', (table)=> {
         table.string('name')
       })
       .then(_ => database.schema.createTable('countries', (table)=> {
         table.string('name')
       }))
       .then(_ => database.schema.createTable('trips', (table)=> {
         table.integer('country_id')
         table.integer('user_id')
       }))
       .then(function() {
         done()
       })
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
    it('should return 200 with a specific user', (done)=> {
      const user = {
        id: 1,
        name: 'Neville Longbottom'
      }
      chai.request(app)
      .get('/api/users/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(user.name).to.equal('Neville Longbottom')
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
    it('should return 200 with a specific country', (done)=> {
      const country = {
        id: 1,
        name: 'Australia'
      }
      chai.request(app)
      .get('/api/countries/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(country.name).to.equal('Australia')
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
    it('should return 200 with a specific trip', (done)=> {
      const trip = {
        id: 1,
        country_id: 3,
        user_id: 9
      }
      chai.request(app)
      .get('/api/trips/1')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(trip.country_id).to.equal(3)
        expect(trip.user_id).to.equal(9)
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
  describe('GET /api/user/:id/trips', ()=> {
    it('should return 200 with all trips for specific user', (done)=> {
      const trips = [{
        id: 1,
        country_id: 3,
        user_id: 9
      },
      {
        id: 2,
        country_id: 11,
        user_id: 9
      }]
      chai.request(app)
      .get('/api/user/1/trips')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(trips).to.have.length(2)
        expect(trips[0].user_id === trips[1].user_id)
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
    it('should return 200 with all trips for specific country', (done)=> {
      const trips = [{
        id: 1,
        country_id: 3,
        user_id: 9
      },
      {
        id: 2,
        country_id: 3,
        user_id: 2
      }]
      chai.request(app)
      .get('/api/trips/country/3')
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.a('object')
        expect(trips).to.have.length(2)
        expect(trips[0].country_id === trips[1].country_id)
        done()
      })
    })
    it('should return 404 if incorrect path is entered', (done)=> {
      chai.request(app)
      .get('/api/trips/coutry/3')
      .end((error, res)=> {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  // happy / sad path for posting a new user
  describe('POST /api/users', ()=> {
    xit('should post a new user', ()=> {
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
        expect(res.body).to.have.length(3)
        expect(res.body[2].name).to.be('Luna Lovegood')
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

  // happy / sad path for posting a new country
  describe('POST /api/countries', ()=> {
    xit('should post a new country', ()=> {
      chai.request(app)
      .post('/api/countries')
      .send({
        id: 31,
        name: 'Canada'
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body.id).to.be(31)
        expect(res.body.name).to.be('Canada')
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
    xit('should post a new trip', ()=> {
      chai.request(app)
      .post('/api/trips')
      .send({
        id: 31,
        country_id: 25,
        user_id: 11
      })
      .end((error, res)=> {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body.id).to.be(31)
        expect(res.body.country_id).to.be(25)
        expect(res.body.user_id).to.be(11)
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

})

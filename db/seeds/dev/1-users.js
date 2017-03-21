exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(() => {
    return Promise.all([

      knex('users').insert({
        name: "Devin Beliveau",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Justin Wood",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Dan Grund",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Alex Tideman",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Meeka Gayhart",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Noah Peden",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Taylor Moore",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Sam Johnson",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Dylan Avery",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Brenna Martenson",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Mike Dao",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Yung Jhun",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Bekah Lundy",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Gabi Procell",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Mike Ziccardi",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Mike Limberg",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Bill Clinton",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Anna Kendrick",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Tina Fey",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Ian Lancaster",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Kristen Burgess",
        created_at: new Date
      }),

      knex('users').insert({
        name: "George Clooney",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Michael Jordan",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Graham Nessler",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Matt Kaufman",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Andrew Crist",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Luke Skywalker",
        created_at: new Date
      }),

      knex('users').insert({
        name: "The Doctor",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Ross Gellar",
        created_at: new Date
      }),

      knex('users').insert({
        name: "Dwayne Johnson",
        created_at: new Date
      })

    ])
  })
}

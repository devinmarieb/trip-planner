exports.seed = function(knex, Promise) {
  return knex('trips').del()
  .then(() => {
    return Promise.all([

      knex('trips').insert({
        country_id: 1,
        user_id: 1,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 2,
        user_id: 4,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 13,
        user_id: 5,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 8,
        user_id: 18,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 19,
        user_id: 6,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 19,
        user_id: 1,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 7,
        user_id: 7,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 29,
        user_id: 9,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 30,
        user_id: 30,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 23,
        user_id: 3,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 5,
        user_id: 13,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 6,
        user_id: 12,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 12,
        user_id: 6,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 15,
        user_id: 15,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 2,
        user_id: 9,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 9,
        user_id: 2,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 2,
        user_id: 3,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 8,
        user_id: 9,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 19,
        user_id: 17,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 17,
        user_id: 19,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 27,
        user_id: 4,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 4,
        user_id: 27,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 9,
        user_id: 3,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 6,
        user_id: 6,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 22,
        user_id: 22,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 3,
        user_id: 3,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 20,
        user_id: 10,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 10,
        user_id: 20,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 21,
        user_id: 21,
        created_at: new Date
      }),

      knex('trips').insert({
        country_id: 7,
        user_id: 11,
        created_at: new Date
      })

    ])
  })
}

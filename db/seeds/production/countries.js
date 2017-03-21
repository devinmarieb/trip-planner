exports.seed = function(knex, Promise) {
  return knex('countries').del()
  .then(() => {
    return Promise.all([

      knex('countries').insert({
        name: "Aruba",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Australia",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Brazil",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Croatia",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Denmark",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Egypt",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Faroe Islands",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Fiji",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Ghana",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Greenland",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Hungary",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Iceland",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Italy",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Jamaica",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Japan",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Kiribati",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Laos",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Morocco",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "New Zealand",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Oman",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Peru",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Qatar",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Romania",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Syria",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Turkey",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "UAE",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Venezuela",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Wales",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Yemen",
        created_at: new Date
      }),

      knex('countries').insert({
        name: "Zambia",
        created_at: new Date
      })

    ])
  })
}

exports.seed = function(knex, Promise) {
  return knex('countries').del()
  .then(() => {
    return Promise.all([
      knex('countries').insert({
        name: 'Canada',
        created_at: new Date
      })
    ])
  })
}

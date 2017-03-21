exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary()
      table.string('name')

      table.timestamps()
    }),

    knex.schema.createTable('countries', function(table){
      table.increments('id').primary()
      table.string('name')

      table.timestamps()
    }),

    knex.schema.createTable('trips', function(table){
      table.increments('id').primary()
      table.integer('country_id')
        .references('id')
        .inTable('countries')
      table.integer('user_id')
        .references('id')
        .inTable('users')

      table.timestamps()
    })

  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('trips'),
    knex.schema.dropTable('countries'),
    knex.schema.dropTable('users')
  ])
}

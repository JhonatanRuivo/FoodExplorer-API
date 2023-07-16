
exports.up = knex => knex.schema.createTable('ingredients', table => {
  table.increments('id').primary()
  table.varchar('name')
  table.integer('dish_id').references('id').inTable('dishes').onDelete('cascade')
  table.timestamp('created_at').defaultTo(knex.fn.now())   
})


exports.down = knex => knex.schema.dropTable('ingredients')

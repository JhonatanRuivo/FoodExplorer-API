exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.varchar('name')
    table.varchar('email')
    table.varchar('password')
    table
      .enum('role', ['admin', 'customer'], {
        useNative: true,
        enumName: 'roles',
      })
      .notNullable()
      .defaultTo('customer')
    table.varchar('avatar').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('users')

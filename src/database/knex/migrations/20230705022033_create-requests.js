
exports.up = knex => knex.schema.createTable("requests", table => {
    table.increments("id").primary()
    table.integer("user_id").references("id").inTable("users")
    table.integer("dish_id").references("id").inTable("dishes")
    table.varchar("name").references("name").inTable("dishes")
    table.double("price").references("price").inTable("dishes")
    table.timestamp("created_at").defaultTo(knex.fn.now())

})


exports.down = knex => knex.schema.dropTable("requests")

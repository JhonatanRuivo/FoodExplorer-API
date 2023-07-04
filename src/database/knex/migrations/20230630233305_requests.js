
exports.up = knex => knex.schema.createTable("requests", table => {
    table.increments("id")
    table.integer("user_id").references("id").inTable("users")
    table.integer("dish_id").references("id").inTable("dishes")
    table.text("name")
    table.text("price")
    table.timestamp("created_at").defaultTo(knex.fn.now())

})


exports.down = knex => knex.schema.dropTable("requests")

exports.up = knex => knex.schema.createTable("dishes", table=> {
    table.increments("id").primary()
    table.integer("user_id").references("id").inTable("users")
    table.varchar("name")
    table.text("description")
    table.varchar("category")
    table.double("price")
    table.varchar("image")
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())

})


exports.down = knex => knex.schema.dropTable("dishes")
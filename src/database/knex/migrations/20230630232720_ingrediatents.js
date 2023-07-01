
exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id")
    table.text("name")
    table.integer("dish_id").references("id").inTable("dishes")
    table.timestamp("created_at").defaultTo(knex.fn.now())

})


exports.down = knex => knex.schema.dropTable("ingredients")

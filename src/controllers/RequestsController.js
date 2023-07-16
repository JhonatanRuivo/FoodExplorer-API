const knex = require('../database/knex')

class RequestsController {
    async create (request, response) {
        const {user_id} = request.params
        const {dish_id} = request.body

        await knex("requests").insert({
            user_id,
            dish_id
        })

        return response.json("Pedido criado.")
    }

    async index (request, response) {
        const {user_id} = request.params

       const dishes = await knex("requests").where({user_id})
    
       return response.json(dishes)
    }

}

module.exports = RequestsController
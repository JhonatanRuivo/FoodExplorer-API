const knex = require('../database/knex')

class DishesController {
    async create(request, response) {
        const {image, name, category, price, description, ingredients} = request.body
        const { user_id} = request.params

        const dish_id = await knex("dishes").insert({
            user_id,
            image,
            name,
            category,
            price,
            description,
        })

        const ingredientsInsert = ingredients.map(ingredients => {
            return {
                dish_id: dish_id[0],
                name: ingredients,
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        response.json(`Prato ${name} cadastrado!`)
    }

    async show(request, response) {
        const { id } = request.params

        const dishes = await knex("dishes").where({id}).first()
        const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name")
        
        return response.json({...dishes, ingredients})
    }

    async delete(request, response) {
        const { id } = request.params

        await knex("dishes").where({id}).delete() 

        return response.json("deletado com sucesso!")
    }

}

module.exports = DishesController
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

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

    async index(request, response) {
    const {name, category, ingredients} = request.query

    let dishes

    if(ingredients){
        const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim())

        dishes = await knex("ingredients")
        .select([
            "dishes.id",
            "dishes.name"
        ])
        .whereLike('dishes.name', `%${name}%`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name")
    } else {

    dishes = await knex("dishes")
    .whereLike('name', `%${name}%`)
    .andWhereLike('category', `%${category}%`)
    .orderBy("price")

    }

    const nameIngredients = await knex("ingredients")
    const dishesWithIngredients = dishes.map(dish => {
        const dishIngredient = nameIngredients.filter(ingredient => ingredient.dish_id === dish.id)

        return {
            ...dish,
            ingredients: dishIngredient
        }
    })

    response.json(dishesWithIngredients)
 }

    async update(request, response) {
        const { id } = request.params
        const {  image, name, category, price, description, ingredients } = request.body

        const [dish] = await knex("dishes").where({id})

        if(!dish){
            throw new AppError('Prato não encontrado')
        }

        dish.image = image ?? dish.image
        dish.name = name ?? dish.name
        dish.category = category ?? dish.category
        dish.price = price ?? dish.price
        dish.description = description ?? dish.description

        await knex("dishes").where({id}).update({
            image: dish.image,
            name: dish.name,
            category: dish.category,
            price: dish.price,
            description: dish.description,
            updated_at: knex.fn.now()
        })

        const hasOnlyIngredients = typeof ingredients === "string"


		let ingredients_list
		if (hasOnlyIngredients) {
			const ingredients_array = ingredients.split(",");
			ingredients_list = ingredients_array.map(ingredient => {
				return {
					name: ingredient,
					dish_id: id
				};
			});
		} else if (ingredients.length > 1) {

			ingredients_list = ingredients.map(ingredient => {
				return {
					name: ingredient,
					dish_id: id
				};
			});

			await knex("ingredients").where({ dish_id: id }).delete();
			await knex("ingredients").where({ dish_id: id }).insert(ingredients_list);
		}
        

        return response.json("atualizado com sucesso")
    }
}

module.exports = DishesController

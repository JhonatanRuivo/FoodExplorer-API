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
        const { dish_id } = request.params 
        const { image, name, category, price, description, ingredients } = request.body
        


        if(image){
            dish_id.image = image ?? dish_id.image.image
            dish_id.name = name ?? dish_id.name
            dish_id.category = category ?? dish_id.category
            dish_id.price = price ?? dish_id.price
            dish_id.description = description ?? dish_id.description
            dish_id.ingredients = ingredients ?? dish_id.ingredients
        }
        
        

        await knex("dishes").update({
            image,
            name,
            category,
            price,
            description,
            ingredients
        })
                 
       return response.json({image,
        name,
        category,
        price,
        description,
        ingredients})

 }
}

module.exports = DishesController
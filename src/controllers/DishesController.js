const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body
    const user_id = request.user.id

    const { filename: imageFilename } = request.file

    const diskStorage = new DiskStorage()

    const filename = await diskStorage.saveFile(imageFilename)

    const [dish_id] = await knex('dishes').insert({
      user_id,
      name,
      category,
      price,
      description,
      image: filename,
    })

    const hasOnlyOneIngredient = typeof ingredients === 'string'

    let ingredientsInsert
    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        dish_id,
      }
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((ingredient) => {
        return {
          name: ingredient,
          dish_id,
        }
      })
    } else {
      return
    }

    await knex('ingredients').insert(ingredientsInsert)

    return response.status(201)
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients').where({ dish_id: id }).orderBy('name')

    return response.json({ ...dish, ingredients })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('dishes').where({ id }).delete()

    return response.json('deletado com sucesso!')
  }

  async index(request, response) {
    const { name, category, ingredients } = request.query

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map((ingredient) => ingredient.trim())

      dishes = await knex('ingredients')
        .select(['dishes.id', 'dishes.name'])
        .whereLike('dishes.name', `%${name}%`)
        .whereIn('ingredients.name', filterIngredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .orderBy('dishes.name')
    } else {
      dishes = await knex('dishes')
        .whereLike('name', `%${name}%`)
        .andWhereLike('category', `%${category}%`)
        .orderBy('created_at')
    }

    const nameIngredients = await knex('ingredients')
    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredient = nameIngredients.filter((ingredient) => ingredient.dish_id === dish.id)

      return {
        ...dish,
        ingredients: dishIngredient,
      }
    })

    return response.status(200).json(dishesWithIngredients)
  }

  async update(request, response) {
    try {
      const { id } = request.params

      const { name, category, price, description, ingredients} = request.body
      const file = request.file

      const dish = await knex('dishes').where({ id }).first()

      if (file && file.filename) {
        const diskStorage = new DiskStorage()


        if (dish.image) {
          await diskStorage.deleteFile(dish.image)
        }

        const filename = await diskStorage.saveFile(file.filename)

        dish.image = filename
      }

      if (!dish) {
        throw new AppError('Prato não encontrado')
      }

      dish.name = name ?? dish.name
      dish.category = category ?? dish.category
      dish.price = price ?? dish.price
      dish.description = description ?? dish.description

      const ingredientsInsert = ingredients.map((name) => ({
        name,
        dish_id: dish.id,
      }))

      await knex('dishes').where({ id }).update(dish)
      await knex('dishes').where({ id }).update('updated_at', knex.fn.now())

      await knex('ingredients').where({ dish_id: id }).delete()
      await knex('ingredients').insert(ingredientsInsert)

      return response.status(200).json({id})
    } catch (error) {
      console.log(error.message)
      return response.status(400).json(error)
    }
  }
}
module.exports = DishesController

const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class FavoritesController {
  async create (request, response) {
    const {user_id} = request.params
    const {dish_id} = request.body

    const [checkFavExists] = await knex('favorites').where({dish_id}).andWhere({user_id})

    if(checkFavExists) {
      throw new AppError('prato já favoritado.')
    }

    await knex('favorites').insert({
      user_id: user_id,
      dish_id: dish_id
    })
    
    return response.json('Favoritado com sucesso!')
  } 

  async index (request, response) {
    const {user_id} = request.params

    const favorites = await knex('favorites')
      .where({user_id})

        
    return response.json(favorites)
  }

}

module.exports = FavoritesController
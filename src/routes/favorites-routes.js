const {Router} = require('express')

const favoritesRouter = Router()

const FavoritesController = require('../controllers/FavoritesController')
const favoritesController = new FavoritesController()

favoritesRouter.post('/:user_id', favoritesController.create)
favoritesRouter.get('/:user_id', favoritesController.index)

module.exports = favoritesRouter
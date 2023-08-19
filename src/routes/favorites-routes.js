const { Router } = require('express')

const favoritesRouter = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const FavoritesController = require('../controllers/FavoritesController')
const favoritesController = new FavoritesController()

favoritesRouter.use(ensureAuthenticated)

favoritesRouter.post('/', favoritesController.create)
favoritesRouter.get('/', favoritesController.index)

module.exports = favoritesRouter

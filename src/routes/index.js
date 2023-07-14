const {Router} = require('express')
const usersRouter = require('./users-routes')
const dishesRouter = require('./dishes-routes')
const favoritesRouter = require('./favorites-routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRouter)
routes.use('/favorites', favoritesRouter)

module.exports = routes
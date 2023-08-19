const {Router} = require('express')
const usersRouter = require('./users-routes')
const dishesRouter = require('./dishes-routes')
const requestsRouter = require('./requests-routes')
const sessionsRouter = require('./sessions-routes')
const favoritesRouter = require('./favorites-routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRouter)
routes.use('/requests', requestsRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/favorites', favoritesRouter)

module.exports = routes
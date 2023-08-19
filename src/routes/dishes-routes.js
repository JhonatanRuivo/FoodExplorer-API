const { Router } = require('express')

const dishesRouter = Router()

const DishesController = require('../controllers/DishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const dishesController = new DishesController()

dishesRouter.use(ensureAuthenticated)

dishesRouter.post('/', dishesController.create)
dishesRouter.get('/:id', dishesController.show)
dishesRouter.delete('/:id', dishesController.delete)
dishesRouter.get('/', dishesController.index)
dishesRouter.put('/:id', dishesController.update)

module.exports = dishesRouter

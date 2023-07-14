const {Router} = require('express')

const dishesRouter = Router()

const DishesController = require('../controllers/DishesController')

const dishesController = new DishesController()

dishesRouter.post('/:user_id', dishesController.create)
dishesRouter.get('/:id', dishesController.show)
dishesRouter.delete('/:id', dishesController.delete)
dishesRouter.get('/', dishesController.index)
dishesRouter.put('/:id', dishesController.update)

module.exports = dishesRouter
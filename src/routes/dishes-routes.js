const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const DishesImageController = require('../controllers/DishesImageController')

const dishesRouter = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishesImageController = new DishesImageController()

dishesRouter.use(ensureAuthenticated)

dishesRouter.post('/', dishesController.create)
dishesRouter.get('/:id', dishesController.show)
dishesRouter.delete('/:id', dishesController.delete)
dishesRouter.get('/', dishesController.index)
dishesRouter.put('/:id', dishesController.update)
dishesRouter.patch('/image', upload.single('image'), dishesImageController.update)

module.exports = dishesRouter

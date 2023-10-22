const multer = require('multer')
const { Router } = require('express')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const upload = multer(uploadConfig.MULTER)
const dishesRouter = Router()

const dishesController = new DishesController()

dishesRouter.use(ensureAuthenticated)

dishesRouter.post('/', verifyUserAuthorization('admin'), upload.single('image'), dishesController.create)
dishesRouter.get('/', dishesController.index)
dishesRouter.get('/:id', dishesController.show)
dishesRouter.put('/:id', verifyUserAuthorization('admin'), upload.single('image'), dishesController.update)
dishesRouter.delete('/:id', verifyUserAuthorization('admin'), dishesController.delete)

module.exports = dishesRouter

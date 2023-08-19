const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const dishesRouter = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()

dishesRouter.use(ensureAuthenticated)

dishesRouter.post('/', dishesController.create)
dishesRouter.get('/:id', dishesController.show)
dishesRouter.delete('/:id', dishesController.delete)
dishesRouter.get('/', dishesController.index)
dishesRouter.put('/:id', dishesController.update)
dishesRouter.patch('/imagedish', upload.single('image'), (request, response) => {
  console.log(request.file.filename)
  response.json()
})

module.exports = dishesRouter

const {Router} = require('express')

const usersRouter = Router()

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require ('../middlewares/ensureAuthenticated')

const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/', ensureAuthenticated, usersController.update)

module.exports = usersRouter
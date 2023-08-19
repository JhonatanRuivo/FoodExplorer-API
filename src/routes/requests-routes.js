const { Router } = require('express')

const requestsRouter = Router()
const RequestsController = require('../controllers/RequestsController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const requestsController = new RequestsController()

requestsRouter.use(ensureAuthenticated)

requestsRouter.post('/', requestsController.create)
requestsRouter.get('/', requestsController.index)

module.exports = requestsRouter

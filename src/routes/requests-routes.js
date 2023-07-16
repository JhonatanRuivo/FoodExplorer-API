const { Router } = require('express')

const requestsRouter = Router()
const RequestsController = require('../controllers/RequestsController')

const requestsController = new RequestsController()

requestsRouter.post('/:user_id', requestsController.create)
requestsRouter.get('/:user_id', requestsController.index)

module.exports = requestsRouter
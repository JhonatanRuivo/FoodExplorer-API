const { Router } = require("express")

const requestsRouter = Router()
const RequestsController = require("../controllers/requestsController")

const requestsController = new RequestsController

requestsRouter.post("/:user_id", requestsController.create)

module.exports = requestsRouter
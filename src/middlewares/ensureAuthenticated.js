const { verify } = require('jsonwebtoken')
const authConfig = require('../configs/auth')
const AppError = require('../utils/AppError')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token inválido!')
  }

  const [, token] = authHeader.split(' ')
}

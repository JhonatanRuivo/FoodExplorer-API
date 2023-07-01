const knex = require('../database/knex')
const AppError = require("../utils/AppError")

class UsersController {
   async create(request, response) {
        const {name, email, password, } = request.body
        const users = () =>  knex('users')

        if(email) {
            const [checkUserExists] = await users().where({ email })
            
            if (checkUserExists) {
              throw new AppError("Este e-mail já pertence a outro usuário.")
            }
          }
        
        await users().insert({
            name,
            email,
            password
        })

        return response.json({"name": name, "email": email, "password": password})
   }      
}

module.exports = UsersController
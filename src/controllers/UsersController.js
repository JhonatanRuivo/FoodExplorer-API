const knex = require('../database/knex')
const AppError = require("../utils/AppError")
const {hash} = require('bcryptjs')

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

        const hashedPassword = await hash(password, 8)  
        
        await users().insert({
            name,
            email,
            password: hashedPassword
        })

        return response.json({"alert": `usuário ${name} cadastrado`})
   }      
}

module.exports = UsersController
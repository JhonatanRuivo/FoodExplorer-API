const knex = require('../database/knex')
const AppError = require("../utils/AppError")
const {hash, compare} = require('bcryptjs')

class UsersController {
   async create(request, response) {
        const {name, email, password, } = request.body
                
            const [checkUserExists] = await knex('users').where({ email })
            
            if (checkUserExists) {
              throw new AppError("Este e-mail já pertence a outro usuário.")
            }
          
        const hashedPassword = await hash(password, 8)  
        
        await knex('users').insert({
            name,
            email,
            password: hashedPassword
        })

        return response.json({"alert": `usuário ${name} cadastrado`})
   }   
   
   async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const [user] = await knex('users').where({id})
    
    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    if(email){
      const [userWithUpdatedEmail] = await knex('users').where({email})

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já pertence a outro usuário.")
      }
    } 
     
    user.name = name ?? user.name
    user.email = email ?? user.email
      
    
    if(password && !old_password) {
      throw new AppError("Você precisa informar senha antiga para atualizar a nova senha.")
    } 

    if(password && old_password) { 
      const checkPassword = await compare(old_password, user.password)
      if(!checkPassword) {
        throw new AppError("Senha incorreta")
      }
      
      user.password = await hash(password, 8)
    }


    await knex('users').where({id}).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    })

    
    return response.json("updated success")
   } 

}

module.exports = UsersController
'use strict'
const AlunosStaff = use('App/Models/Staff/Alunosstaff')

class RegistrationController {

    async store({request,response,auth}){
        try{
            const authentication = await auth.check()
            if(authentication){
                const user = await auth.getUser()
                console.log(authentication, user)
            }            
        }catch(erro){
            return response.json({'message': erro.message})
        }
    }

}

module.exports = RegistrationController

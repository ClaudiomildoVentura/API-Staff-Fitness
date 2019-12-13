'use strict'
const Payments = use('App/Models/Staff/Payment')
const Staff = use('App/Models/User')
class PlanController {
    async show({request, response, auth}){
        const idStaff = request.input('idStaff')
        try{
            if(auth.user.accessLevel == 2 && (idStaff == auth.user.id)){
                const plan = await Payments.findBy('idPersonal',idStaff)                              
                plan.loadMany(['staff','plan'])
                console.log(plan)
                return response.send({'plan': plan, idStaff})
            }    
        }catch(error){
            return response.json({message: error.message})
        }
    }    

}

module.exports = PlanController

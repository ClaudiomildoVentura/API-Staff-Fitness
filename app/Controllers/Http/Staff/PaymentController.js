'use strict'
const Payments = use('App/Models/Staff/Payment')
const moment = require("moment");
class PaymentController {
    async store({request, response, auth}){
        try{
            const authentication = await auth.check()
            if(authentication){
                const user = await auth.getUser()                
                const content = request.all()
                const moments = moment(content.lastEventDate)
                const expirationDate = moments.add(33, 'days').calendar() 
                const amount = content.items.amount
                const method = content.method
                const paymentLink = content.paymentLink
                const idPlan = content.items.id
                const idPersonal = user.id
                const purchaseDate = content.date
                const pagseguroCode = content.code
                const payment = new Payments()
                payment.idPersonal = idPersonal
                payment.amount = amount
                payment.method = method
                payment.paymentLink = paymentLink
                payment.idPlan = idPlan
                payment.purchaseDate = purchaseDate
                payment.pagseguroCode = pagseguroCode
                payment.expirationDate = expirationDate
                await payment.save()
                return response.json({'Resposta da request da api':'Resposta da request da api', content, payment})                
            }
        }catch(erro){
            return response.json({'message': erro.message})
        }
    }    
}

module.exports = PaymentController

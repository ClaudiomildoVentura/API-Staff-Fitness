'use strict'
const mercadopago = use('mercadopago')
mercadopago.configure({
  sandbox: true,
  access_token: 'TEST-7967185249180987-092900-196f2e4207b7600598278927cd7bc0e9-210538680'
})

class PaymentController {
  async payment({ request, response }) {
    try {
      mercadopago.payment.create({
        description: 'Buying a PS4',
        transaction_amount: 10500,
        payment_method_id: 'rapipago',
        payer: {
          email: 'test_user_3931694@testuser.com',
          identification: {
            type: 'DNI',
            number: '34123123'
          }
        }
      }).then(function (mpResponse) {
        return response.send(payment, 'entrou aqui', mpResponse, Object.keys(mpResponse))
        console.log(mpResponse);
      }).catch(function (mpError) {
        return response.json(mpError.message)
      })
      return response.json({ 'mp': Object.keys(mercadopago), 'mpp': mercadopago, })
    } catch (erro) {
      response.json(erro.message)
    }
  }
}
module.exports = PaymentController
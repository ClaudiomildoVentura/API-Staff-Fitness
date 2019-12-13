'use strict'
const mercadopago = use('mercadopago')

class ConfigureController {
    return(){
        mercadopago.configure({
            sandbox: true,
            access_token: 'TEST-7967185249180987-092900-196f2e4207b7600598278927cd7bc0e9-210538680'    
        })    
    }
}

module.exports = ConfigureController
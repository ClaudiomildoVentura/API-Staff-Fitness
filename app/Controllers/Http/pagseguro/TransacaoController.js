'use strict'
const pagseguro = use('Config/pagseguro')

class TransacaoController {

    async store ({request, response, auth}){
        try{
            const idPersonal = request.input('idPersonal')
            const idPlano = request.input('idPlano')
            const plano = request.findBy('idPlano',idPlano)
        }catch(erro){
            response.json({"message":erro.message})
        }
    }

}

module.exports = TransacaoController

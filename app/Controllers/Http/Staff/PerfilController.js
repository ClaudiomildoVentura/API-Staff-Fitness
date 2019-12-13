'use strict'
const Perfil = use('App/Models/User')
class PerfilController {
    async show({request,response, auth}){
        try{
            const authentication = await auth.check()
            if(authentication){
                const user = await auth.getUser()
                const personal = await Perfil.find(user.id)
                if(!personal){return response.json({'status':404,'message':'Usuário não localizado no sistema'})}
                return response.json({'personal':personal})     
    
            }
        }catch(erro){
            return response.json ({'message': erro.message})
        }
    }

    async update({request,response, auth}){
        try{
            const authentication = await auth.check()
            if(authentication){
                const user = await auth.getUser()
                const id = user.id     
                const personal = await Perfil.find(id)
                if(!personal){
                    return response.json({'status':404,'message':'Usuário não localizado no sistema'})
                }
                const alteracoes = request.only(['nome','peso','altura','username','telefone'])
                personal.nome = alteracoes.nome
                personal.peso = alteracoes.peso
                personal.altura = alteracoes.altura
                personal.username = alteracoes.username
                personal.telefone = alteracoes.telefone
                await personal.save()
                return response.json({'status':200, 'message':'Alterações realizadas com sucesso', alteracoes})         
            }
        }catch(error){
            return response.json({'message': error.message})
        }
    }

    async delete({request,response, auth}){
        const email = request.input('email')        
        const personal = await Perfil.findBy('email',email)
        if(!personal){return response.json({'status':404,'message':'Usuário não localizado no sistema'})}
        await personal.delete()
        return response.json({'status':204, message:'Usuário excluído com sucesso'}) 
    }



}

module.exports = PerfilController

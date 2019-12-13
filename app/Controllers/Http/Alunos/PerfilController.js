'use strict'
const User = use('App/Models/Staff/Alunosstaff')
const Database = use('Database')
class PerfilController {
    async show({ request, response }) {
        try {
            const email = request.input('email')
            const perfil = await User.findBy({ 'accesslevel': 1, 'email': email, 'status': 0 })
            await perfil.load('staff')
            return response.json(perfil)
        } catch (error) {
            return response.json({ 'message': error.message })
        }
    }

    async update({ request, response, auth }) {
        try {
            const authentication = await auth.check();
            if (authentication) {
                const user = await auth.getUser()
                const currentUser = await User.find(user.id)
                currentUser.username = request.input('username')
                currentUser.height = request.input('height')
                currentUser.weight = request.input('weight')
                currentUser.email = request.input('email')
                await currentUser.save()
                return response.json({ 'message': 'Alterações realizadas com sucesso', currentUser })
            }
        } catch (erro) {
            return response.json({ 'message': erro.message })
        }
    }
}
module.exports = PerfilController
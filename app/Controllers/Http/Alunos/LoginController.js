'use strict'

const User = use('App/Models/Staff/Alunosstaff')
const Hash = use('Hash')
const Database = use('Database')
class LoginController {
    async login({ request, auth, response }) {
        try {
            const email = request.input("email")
            const password = await Hash.make(request.input("password"));
            let authentication = await Database
                .table('alunosstaffs')
                .select('*')
                .where({ "email": email }, { "password": password })
            //            return response.json(authentication)
            if (authentication.status != '') {
                switch (authentication[0].status) {
                    case 0: {
                        let accessToken = await auth.generate(authentication[0])
                        return response.json({ "status": 0, "accessLevel": authentication[0].accesslevel, "accessToken": accessToken, "message": "Bem-vindo ao Sistema, " + authentication[0].username, "userId": authentication[0].id })
                    }
                        break
                    case -1: return response.json({ "status": -1, "message": "Esta conta foi excluída pelo próprio usuário" })
                        break
                    case 1: return response.json({ "status": 1, "message": "E-mail de usuário não validado, por gentileza verifique sua caixa de entrada." })
                        break
                    case 2: return response.json({ "status": 2, "message": "Por violação nos termos de conduta do software, o usuário teve seu acesso ao sistema suspenso." })
                        break
                    case 3: return response.json({ "status": 3, "message": "Por violação nos termos de conduta do software, o usuário teve seu acesso ao sistema revogado." })
                        break
                    default: return response.json({ "status": "desconhecido", "message": "O status dessa conta é desconhecido, por gentileza envie um email para stafffitnessmail@gmail.com informando o problema." })
                        break
                }
            } else {
                return response.json({ 'aki': 'veio daki', authentication })
            }
        } catch (e) {
            switch (e.status) {
                case 401: {
                    return response.send({ "status": 401, "message": "Usuário ou senha inseridos incorretamente" })
                }
                default: {
                    return (e.message)
                }
            }
        }
    }
}
module.exports = LoginController
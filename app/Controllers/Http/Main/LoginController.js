'use strict'
const User = use('App/Models/User')
const Validators = use('Validator')

class LoginController {
    async login({ request, auth, response }) {
        const email = request.input("email")
        const password = request.input("password");
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy("email", email)
                let accessToken = await auth.generate(user)
                switch (user.status) {
                    case 0: return response.json({ "status": 0, "nivelAcesso": user.accesslevel, "accessToken": accessToken, "message": "Bem-vindo ao Sistema, " + user.username, "userId": user.id })
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
'use strict'
const Mail = use('Mail')
const Env = use('Env')
//const email = Env.get('MAIL_USERNAME', 'DATABASE_URL.MAIL_USERNAME')
const Helpers = use('Helpers')

const User = use('App/Models/User')
const Token = use('App/Models/Token')
class SendMailController {
    async WelcomeMail(user, token) {
        user.token = token
        await Mail.send('mail.welcomemail', user.toJSON(), (message) => {
            message
                .to(user.email)
                .from(email)
                .subject("Bem-vindo ao StaffFitness")
        })
    }

    async ActivateMail({ params, response }) {
        const token = params.token
        const email = params.email
        try {
            if (Token.findBy("token", token)) {
                let user = await User.findBy("email", email)
                user.status = 0
                user.save()
                return response.json({ message: "Usuário ativado com sucesso, volte a tela de login e acesse sua conta!" })
            }
        } catch (e) {
            response.json({ status: e.message, message: "Não foi possível ativar esse usuário, por favor tente novamente." })
        }
    }
    async ForgotPassWordMail(user, token) {
        user.token = token
        await Mail.send('mail.forgotpasswordmail', user, (message) => {
            message
                .to(user.email)
                .from(email)
                .subject("Recuperação de Senha StaffFitness")
        })
    }

    async testeemail({ request }) {
        const lemail = request.input('email', 'leobelasm@gmail.com')
        let activeuser = { user: 'leonardobelas', token: 'powerrangers' }
        await Mail.send('mail.welcomemail', { activeuser }, (message) => {
            message
            .embed(Helpers.publicPath('staffNovo.png'), 'logo')
            .embed(Helpers.resourcesPath('assets/imgs/background.jpg'), 'background')
            .to(lemail)
                .subject("Bem-vindo ao StaffFitness")
        })
    }

}

module.exports = SendMailController
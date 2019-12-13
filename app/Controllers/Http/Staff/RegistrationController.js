'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')
const Register = use('App/Validators/Staff/Registration')
//const Mail = use('App/Controllers/Http/Main/SendMailController')
const Mail = use('Mail')
const Helpers = use('Helpers')
class RegistrationController {
  async storeteste({ request, response }) {
    const username = request.input("username")
    const email = request.input("email")
    const password = request.input("password")
    const nome = request.input("nome")
    const cpf = request.input("cpf")
    const datanascimento = request.input("datanascimento")
    const telefone = request.input("telefone")
    const cref = request.input("cref")

    /*    const validation = await validate(request.all(), validation.rules())
        if (validation.fails()) {
          session
            .withErrors(validation.messages())
            .flashExcept(['password'])
          return response.json({message: "A validação falhou"})
        }    */
    let user = new User()
    user.username = username
    user.email = email
    user.password = password
    user.nome = nome
    user.cpf = cpf
    user.datanascimento = datanascimento
    user.telefone = telefone
    user.cref = cref
    user.status = 1
    user.accesslevel = 2
    /*    user = await user.save()
        const newuser = await User.findBy("email", email)
        let activeuser = {user: newuser, token: await auth.generate(newuser) }          
        await Mail.send('mail.welcomemail', {activeuser}, (message) => {
          message
          .to(activeuser.user.email)
          .from(email)
          .subject("Bem-vindo ao StaffFitness")
        })       */
    return response.json({ "status": 0, "message": "Usuário criado com sucesso " + user.nome + "! Um e-mail de verificação foi enviado para seu email " + user.email })
  }

  async store({ request, auth, response }) {
    try {
      const username = request.input("username")
      const email = request.input("email")
      const email_confirmation = request.input("email_confirmation")
      const password = request.input("password")
      const password_confirmation = request.input("password_confirmation")
      const nome = request.input("nome")
      const cpf = request.input("cpf")
      const datanascimento = request.input("datanascimento")
      const telefone = request.input("telefone")
      const cref = request.input("cref")

      let user = new User()
      user.username = username
      user.email = email
      user.password = password
      user.nome = nome
      user.cpf = cpf
      user.datanascimento = datanascimento
      user.telefone = telefone
      user.cref = cref
      user.status = 1
      user.accesslevel = 2

      user = await user.save()
      const newuser = await User.findBy("email", email)
      let activeuser = { user: newuser, token: await auth.generate(newuser) }
      await Mail.send('mail.welcomemail', { activeuser }, (message) => {
        message
        .embed(Helpers.publicPath('staffNovo.png'), 'logo')
        .embed(Helpers.resourcesPath('assets/imgs/background.jpg'), 'background')
          .to(activeuser.user.email)
          .from('email')
          .subject("Bem-vindo ao StaffFitness")
      })
      return response.json({ "status": 0, "message": "Usuário criado com sucesso " + activeuser.user.nome + "! Um e-mail de verificação foi enviado para seu email " + activeuser.user.email })
    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async resendMail({ request, response }) {
    const resendEmail = request.input("email")
    const user = await User.findBy("email", resendEmail)
    let activeuser = { user: user, token: await auth.generate(user) }
    await Mail.send('mail.resendMail', { activeuser }, (message) =>
      message
        .to(activeuser.user.mail)
        .from(email)
        .subject("Bem-Vindo ao StaffFitness")
    )
    return response.json({ status: 0, message: "E-mail enviado com sucesso" })
  }



}

module.exports = RegistrationController
'use strict'

const Validator = use('Validator')

class MainLogin {
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'O campo email é de preenchimento obrigatório',
      'email.email': 'Insira um formato de e-mail válido (exemplo@deemail.com)',
      'password.required': 'O campo password é de preenchimento obrigatório'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json({
      message: errorMessages[0].message
    })
  }
}
module.exports = MainLogin
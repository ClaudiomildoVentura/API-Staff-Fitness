'use strict'

const Validator = use('Validator')

class StaffRegistration {
  get rules() {
    return {
      nome: 'required',
      email: 'required|email|unique:users,email|confirmed',
      username: 'required|unique:users,username',
      datanascimento: 'required',
      cref: 'required',
      password: 'required|min:8|max:20|confirmed',
    }
  }

  get messages() {
    return {
      'unique': 'O campo {{field}} já consta em nosso sistema',
      'nome.required': 'O campo nome é de preenchimento obrigatório',
      'email.required': 'O campo email é de preenchimento obrigatório',
      'email.email': 'Insira um formato de e-mail válido (exemplo@deemail.com)',
      'email.unique': 'Esse e-mail já está vinculado a uma conta em nosso sistema',
      'email.confirmed': 'os campos de email precisam ser iguais',
      'datanascimento.required': 'O campo data de nascimento é de preenchimento obrigatório',
      'cref.required': 'O campo CREF é de preenchimento obrigatório',
      'password.required': 'O campo password é de preenchimento obrigatório',
      'password.min': 'O campo password precisa ter entre 8 a 20 caracteres',
      'password.max': 'O campo password precisa ter entre 8 a 20 caracteres',
      'password.confirmed': "Os campos de senha precisam ser iguais",
      'username.required': 'O campo usuário é de preenchimento obrigatório',
      'username.unique': 'O usuário já está sendo utilizado em nosso sistema. Tente novamente.',
      'accesslevel.required': 'Tipo de acesso não preenchido.',
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json({
      status: 400,
      message: errorMessages[0].message
    })
  }
}
module.exports = StaffRegistration
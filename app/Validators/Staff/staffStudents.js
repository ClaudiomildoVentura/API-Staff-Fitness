'use strict'

class StaffStaffStudents {
  get rules() {
    return {
      name: 'required|min:4',
      email: 'required|email|unique:users,email|confirmed',
    }
  }

  get messages() {
    return {
      'unique': 'O campo {{field}} já consta em nosso sistema',
      'name.required': 'O nome do aluno é de preenchimento obrigatório',
      'email.required': 'O email do aluno é de preenchimento obrigatório',
      'email.email': 'Insira um formato de e-mail válido (exemplo@deemail.com)',
      'email.unique': 'Esse e-mail já está vinculado a uma conta em nosso sistema',
      'email.confirmed': 'os campos de email precisam ser iguais.',
      'nome.min': 'O campo nome precisa ter no mínimo 4 caracteres.'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json({
      status: 400,
      message: errorMessages[0].message
    })
  }
}
module.exports = StaffStaffStudents
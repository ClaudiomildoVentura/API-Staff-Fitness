'use strict'
const Imcs = use('App/Models/Staff/Imc')
class ImcController {
  async getIMCs({ request, response, auth }) {
    try {
      const authentication = await auth.check()
      if (authentication) {
        const user = await auth.getUser()
        const imc = await Imcs
          .query()
          .select('imcs.*', 'users.nome', 'alunosstaffs.name ')
          .where({ 'idAlunoIMC': user.id })
          .innerJoin('alunosstaffs', 'imcs.idAlunoIMC', 'alunosstaffs.id')
          .innerJoin('users', 'imcs.idPersonalIMC', 'users.id')
          .fetch()
        return response.json({ 'imcHistory': imc })
      }
    } catch (erro) {
      return response.json({ 'message': erro.message })
    }
  }
}
module.exports = ImcController
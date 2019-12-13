'use strict'
const Imcs = use('App/Models/Staff/Imc')

class ImcController {
  async getIMCs({ request, response, auth }) {
    try {
      const student = request.input('idStudent')
      const authentication = await auth.check()
      if (authentication) {
        const user = await auth.getUser()
        const imc = await Imcs
          .query()
          .where({ 'idPersonalIMC': user.id })
          .innerJoin('alunosstaffs', 'imcs.idAlunoIMC', 'alunosstaffs.id')
          .fetch()
        return response.json(imc)
      }
    } catch (erro) {
      return response.json({ 'message': erro.message })
    }
  }
}
module.exports = ImcController
'use strict'

const Treinos = use('App/Models/Staff/Treino')

class TreinoController {
  async index({ request, response, view }) {
  }

  async create({ request, response, view }) {
  }

  async store({ request, response }) {
    const idPersonal = request.input("idPersonal")
    const idAluno = request.input("idAluno")
    const nomeTreino = request.input("nomeTreino")
    const categoria = request.input("categoria")
    const equipamento = request.input("equipamento")
    const seriesTreino = request.input("seriesTreino")
    const repeticoes = request.input("repeticoes")
    const intervalos = request.input("intervalos")
    const observacoes = request.input("observacoes")
    const instrucoesVideo = request.input("instrucoesVideo")
    const instrucoes = request.input('idInstrucao')
    const dia = request.input('dia')
    const mes = request.input('mes')
    const ano = request.input('ano')
    const data = dia + "/" + mes + "/" + ano
    request.input('dataExercicio', data)
    const hora = request.input('hora')
    const minuto = request.input('minuto')
    const horario = hora + ":" + minuto
    request.input('horarioExercicio', horario)
  }

  async show({ request, response, auth }) {
    try {
      const authentication = await auth.check()
      const user = await auth.getUser()
      if (authentication && user.accesslevel == 2 && user.status == 0) {
        const treinos = await Treinos.findBy('idPersonal', user.id)
        await treinos.load('students')
        return response.json(treinos)
      }
    } catch (erro) {
      return response.json({ 'message': erro.message })
    }
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = TreinoController
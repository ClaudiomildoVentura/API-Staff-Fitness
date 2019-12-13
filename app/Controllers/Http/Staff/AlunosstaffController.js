'use strict'
const Alunos = use('App/Models/Staff/Alunosstaff')
const Database = use('Database')
const Staff = use('App/Models/User')
const Payments = use('App/Models/Staff/Payment')
const Plan = use('App/Models/Staff/Plan')
const Mail = use('Mail')
const crypto = use('crypto')

class AlunosstaffController {
  async index({ request, response, view }) {
    const alunos = Alunos.all()
    return alunos
  }

  async store({ request, response, auth }) {
    try {
      const id = request.input('idStaff')
      const staff = await auth.getUser()
      let plan = ''
      let allowRegister = ''
      let pendingStudents = ''
      let token = ''
      let aluno = ''
      if (staff.id == id) {
        const payments = await Payments.findBy('idPersonal', id)
        if (!payments) {
          plan = await Plan
            .query()
            .where('planTitle', 'Gratuito')
            .orderBy('planExpirationDate', 'desc')
            .limit(1)
            .fetch()
          if (plan.rows.length == 0) {
            throw new Error('Não há planos disponíveis para você!')
          }
        } else {
        }
        const alunos = await Database
          .from('alunosstaffs')
          .where({ 'alunosstaffs.idStaff': staff.id, 'alunosstaffs.status': 0 })
          .limit(plan.rows[0].quantifyStudents)
        const pendingStudents = await Database
          .from('alunosstaffs')
          .where({ 'alunosstaffs.idStaff': staff.id, 'alunosstaffs.status': 1 })
          .limit((plan.rows[0].quantifyStudents - alunos.length))
        const quantifyPendingStudents = pendingStudents.lenght > 0 ? alunos.lenght - pendingStudents.length : 0
        const allowRegister = plan.rows[0].quantifyStudents - (alunos.length + quantifyPendingStudents)
        if (allowRegister > 0) {
          token = '#aluno' + crypto.randomBytes(5).toString('hex')
          const student = new Alunos()
          student.idStaff = request.input('idStaff')
          student.name = request.input('name')
          student.email = request.input('email')
          student.accessKey = token
          student.password = token
          await student.save()
          aluno = { 'email': request.input('email'), 'name': request.input('nome'), 'chaveAcesso': token }
          await Mail.send('mail.studentactivation', { aluno }, (message) => {
            message
              .to(aluno.email)
              .from('email')
              .subject("Bem-vindo ao StaffFitness")
          })
        }
        return response.send({ 'message': 'Aluno pré-cadastrado com sucesso.', id, plan, staff, token, aluno, 'abcde': (alunos.length - plan.rows[0].quantifyStudents) })
      }
    } catch (erro) {
      return response.send({ 'message': erro.message })
    }
  }

  async show({ params, auth, request, response }) {
    try {
      let staff = await auth.getUser()
      let tokenList = []
      let token = ''
      let plan
      let allowRegister
      let pendingStudents
      let payments = await Payments.findBy('idPersonal', staff.id)
      if (!payments) {
        plan = await Plan
          .query()
          .where('planTitle', 'Gratuito')
          .orderBy('planExpirationDate', 'desc')
          .limit(1)
          .fetch()
      } else {

      }
      const alunos = await Database
        .select("alunosstaffs.id", 'alunosstaffs.accessKey', 'alunosstaffs.id', 'users.email', 'alunosstaffs.name as nome', 'users.telefone')
        .from('alunosstaffs')
        .innerJoin('users', 'users.id', 'alunosstaffs.idStaff')
        .where({ 'alunosstaffs.idStaff': staff.id, 'alunosstaffs.status': 0 })
        .limit(plan.rows[0].quantifyStudents)
      allowRegister = plan.rows[0].quantifyStudents - alunos.length
      if (allowRegister > 0) {
        pendingStudents = await Database
          .select("alunosstaffs.id", 'alunosstaffs.accessKey', 'alunosstaffs.id', 'alunosstaffs.email', 'users.email as emailStaff', 'alunosstaffs.name as nome', 'users.nome as nomeStaff', 'users.telefone')
          .from('alunosstaffs')
          .innerJoin('users', 'users.id', 'alunosstaffs.idStaff')
          .where({ 'alunosstaffs.idStaff': staff.id, 'alunosstaffs.status': 1 })
          .limit((plan.rows[0].quantifyStudents - alunos.length))
        const quantifyStudents = alunos.length + pendingStudents.length
        const allowRegister = plan.rows[0].quantifyStudents - quantifyStudents
        if (allowRegister > 0) {
          for (let i = 0; i < allowRegister; i++) {
            token = '#aluno' + crypto.randomBytes(5).toString('hex')
            tokenList.push(token)
          }
        }
        return response.send({ alunos, payments, plan, 'confirmedStudents': alunos.length, pendingStudents, 'quantifyPendingStudents': quantifyStudents, allowRegister, tokenList })
      } else if (allowRegister <= 0) {
        return response.send({ alunos, payments, plan, 'confirmedStudents': alunos.length, pendingStudents, 'quantifyPendingStudents': 0, 'allowRegister': 0 })
      }
    } catch (error) {
      return response.send({ "message": error.message })
    }
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}
module.exports = AlunosstaffController
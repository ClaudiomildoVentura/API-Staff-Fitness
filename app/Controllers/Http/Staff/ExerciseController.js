'use strict'

const Exercise = use('App/Models/Staff/Treino')
const Database = use('Database')

class ExerciseController {
    async index({ request, response, auth }) {
        try {
            const staff = await auth.getUser()
            if (staff) {
                const treinos = await Database
                    .select("alunosstaffs.id", 'alunosstaffs.idAluno')
                    .from('treinos')
                    .leftJoin('alunosstaffs', 'treinos.idAluno', 'alunosstaffs.idAluno')
                    .where({ 'alunosstaffs.idPersonal': staff.id, 'alunosstaffs.status': 0 })
                return response.send({ treinos })
            }
            //          return alunos
        } catch (error) {
            return response.send({ "message": error.message })
        }
    }
}

module.exports = ExerciseController

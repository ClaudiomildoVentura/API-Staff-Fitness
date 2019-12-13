'use strict'
const Training = use('App/Models/Students/Treino')

class TrainingController {
    async show({ request, response, auth }) {
        try {
            const authentication = await auth.check()
            if (authentication) {
                const user = await auth.getUser()
                const schedule = await Training.findBy('idAluno', user.id)
                await schedule.load('staff')
                return response.json({ schedule })
            }
        } catch (error) {
            return response.json(error.message)
        }
    }
}
module.exports = TrainingController
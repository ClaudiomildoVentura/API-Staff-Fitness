'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Treino extends Model {
    users() {
        return this.hasMany('App/Models/User')
    }

    students() {
        return this.hasMany('App/Models/Staff/Alunosstaff', 'idAluno', 'id')
    }
    static get dates() {
        return super.dates.concat(['dataexercicio'])
    }

    static castDates(field, value) {
        if (field === 'dataexercicio') {
            return value.format('DD/MM/YYYY')
        }
    }
}
module.exports = Treino
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {
    staff() {
        return this.hasMany('App/Models/User', 'id', 'idPPersonal')
    }
    plan() {
        return this.hasMany('App/Models/Staff/Plans', 'id', 'idPlan')
    }
}
module.exports = Payment
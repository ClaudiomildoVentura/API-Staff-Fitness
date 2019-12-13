'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Treino extends Model {
  staff() {
    return this.hasOne('App/Models/User', 'idPersonal', 'id')
  }
}
module.exports = Treino
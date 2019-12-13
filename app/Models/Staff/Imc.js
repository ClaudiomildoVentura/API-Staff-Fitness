'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imc extends Model {
    alunoIMC(){
        return this.hasMany('App/Models/User')
    }
    staffIMC(){
        return this.hasMany('App/Models/User')
    }
}

module.exports = Imc

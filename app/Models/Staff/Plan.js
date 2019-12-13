'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Plan extends Model {
    staffs (){
        return this.hasMany('App/Models/User')
    }
}

module.exports = Plan

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Alunosstaff extends Model {
  static get hidden () {
    return ['password']
  }
    static boot () {
        super.boot()
    
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
          if (userInstance.dirty.password) {
            userInstance.password = await Hash.make(userInstance.password)
          }
        })
      }    
    alunos () {
        return this.hasMany('App/Models/Staff/Registration','idPersonal','id')
    }
    staff () {
      return this.hasOne('App/Models/User', 'idStaff', 'id')
    }    
}

module.exports = Alunosstaff

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImcSchema extends Schema {
  up () {
    this.create('imcs', (table) => {
      table.increments()
      table.timestamps()
      table.integer('idPersonalIMC').references('id').inTable('users')  
      table.integer('idAlunoIMC').references('id').inTable('users')
      table.float("peso",[3,2]).unsigned()
      table.float("altura",[1,2]).unsigned()
      table.float("IMC",[3,2]).unsigned()  
    })
  }

  down () {
    this.drop('imcs')
  }
}

module.exports = ImcSchema

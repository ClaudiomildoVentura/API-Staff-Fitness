'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TreinosSchema extends Schema {
  up() {
    this.create('treinos', (table) => {
      table.increments()
      table.timestamps()
      table.integer('idPersonal', 11).notNullable().references('id').inTable('users')
      table.integer('idAluno', 11).notNullable().references('id').inTable('users')
      table.string('nomeExercicio').notNullable()
      table.string('categoria').notNullable()
      table.string('equipamento').notNullable()
      table.string('instrucoes').notNullable()
      table.integer('nivel').notNullable()
      table.integer('series').notNullable()
      table.integer('intervalo').notNullable()
      table.string('observacoes')
      table.date('dataexercicio').notNullable()
      table.time('horainicio').notNullable()
      table.time('horafim').notNullable()
    })
  }

  down() {
    this.drop('treinos')
  }
}
module.exports = TreinosSchema
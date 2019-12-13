'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipamentoSchema extends Schema {
  up () {
    this.create('equipamentos', (table) => {
      table.increments()
      table.timestamps()
      table.string('nomeEquipamento').notNullable()
      table.string('categoriaEquipamento').notNullable()
      table.text('instrucoes').notNullable()
      table.string('nomeExercicio').notNullable()
    })
  }

  down () {
    this.drop('equipamentos')
  }
}

module.exports = EquipamentoSchema

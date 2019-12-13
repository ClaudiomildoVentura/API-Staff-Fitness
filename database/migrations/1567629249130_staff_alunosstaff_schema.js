'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlunosstaffSchema extends Schema {
  up() {
    this.create('alunosstaffs', (table) => {
      table.increments()
      table.timestamps()
      table.integer('idStaff').references('id').inTable('users')
      table.string('accessKey')
      table.string('name', 80).notNullable()
      table.string('username', 80).nullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('telephone')
      table.decimal('weight', 9, 3)
      table.decimal('height', 9, 3)
      table.integer('accesslevel').defaultTo(1).notNullable
      table.integer('status').defaultTo(1)
    })
  }

  down() {
    this.drop('alunosstaffs')
  }
}
module.exports = AlunosstaffSchema
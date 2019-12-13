'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlansSchema extends Schema {
  up () {
    this.create('plans', (table) => {
      table.increments()
      table.timestamps()
      table.string('planTitle').notNullable()
      table.decimal('amount',[3,2])
      table.integer('quantifyStudents').unsigned()
      table.text('benefits').notNullable()            
      table.integer('daysValidity').notNullable()
      table.date('planExpirationDate').notNullable()
    })
  }

  down () {
    this.drop('plans')
  }
}

module.exports = PlansSchema

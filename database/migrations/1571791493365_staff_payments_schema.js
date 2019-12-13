'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentsSchema extends Schema {
  up() {
    this.create('payments', (table) => {
      table.increments()
      table.timestamps()
      table.integer('idPlan', 11).unsigned().references('id').inTable('plans')
      table.integer('idPersonal', 11).unsigned().references('id').inTable('users')
      table.date('expirationDate').notNullable()
      table.date('purchaseDate').notNullable()
      table.integer('status').defaultTo(1)
      table.decimal('amount', [3, 2]).notNullable()
      table.string('method', 80).notNullable()
      table.string('paymentLink', 255).notNullable()
      table.string('pagseguroCode', 255).notNullable()
    })
  }

  down() {
    this.drop('payments')
  }
}
module.exports = PaymentsSchema
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('nome').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('datanascimento')
      table.string('telefone') 
      table.decimal('peso',9,3)
      table.decimal('altura',9,3)
      table.string('chavedeacesso')
      table.string('cref')
      table.integer('status')
      table.integer('accesslevel')
           .notNullable()      
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

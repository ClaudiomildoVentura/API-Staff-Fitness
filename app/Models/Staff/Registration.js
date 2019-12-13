'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Registration extends Model {
    static get hidden () {
        return ['password']
    }
    
    static castDates (field, value) {
        if (field === 'dob') {
          return `${value.format('DD-MM-YYYY')}`
        }
        return super.formatDates(field, value)
    }
}

module.exports = Registration

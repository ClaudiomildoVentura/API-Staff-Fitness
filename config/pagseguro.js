const Env = use('Env')
const Url = require('url-parse')
const DATABASE_URL = new Url(Env.get('DATABASE_URL'))
const pagseguro = ''

module.exports = pagseguro
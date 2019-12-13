const Env = use('Env')
const Url = require('url-parse')
const DATABASE_URL = new Url(Env.get('DATABASE_URL'))
//const Pagseguro = require('pagseguro-react')
const pagseguro = ''
/*let pagseguro = new PagSeguro({
    email: Env.get('PAGSEGURO_EMAIL', 'DATABASE_URL.PAGSEGURO_EMAIL'),
    token: Env.get('PAGSEGURO_TOKEN','DATABASE_URL.PAGSEGURO_TOKEN'),
    env: Env.get('PAGSEGURO_MODE', 'DATABASE_URL.PAGSEGURO_MODE'),
    debug: Env.get('PAGSEGURO_DEBUG', 'DATABASE_URL.PAGSEGURO_DEBUG'),
    appId: Env.get('PAGSEGURO_APPID','DATABASE_URL.PAGSEGURO_APPID'),
    appKey: Env.get('PAGSEGURO_APPKEY','DATABASE_URL.PAGSEGURO_APPKEY'),
    appId: Env.get('PAGSEGURO_DEBUG','DATABASE_URL.PAGSEGURO_DEBUG')
});*/
//pagseguro.currency('BRL');
module.exports = pagseguro
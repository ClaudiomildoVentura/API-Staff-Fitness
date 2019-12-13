'use strict'
//nao serve pra nada, ignorar
class LoginException {
        handleError = (Error) => {
            if(Error.message===401){
                throw new Error({message: "Usuário ou senha fdasdfdsa"})
            }
        }            
    }

module.exports = LoginException
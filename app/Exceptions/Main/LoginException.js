'use strict'

class LoginException {
    handleError = (Error) => {
        if (Error.message === 401) {
            throw new Error({ message: "User not" })
        }
    }
}
module.exports = LoginException
const Joi = require('joi');


const loginEmail = {
    body : Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

const verifyemail = {
    body : Joi.object().keys({
        email: Joi.string().required(),
        local: Joi.string()
    })
}
//wen update

const verifyvalidate = {
     body : Joi.object().keys({
        token: Joi.string().required(),
        password : Joi.string().required()
    })
}
module.exports = {
    loginEmail,
    verifyemail,
    verifyvalidate
    
}
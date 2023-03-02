const Joi = require('joi');

const location =  {
    body : Joi.object().keys({
        locationName : Joi.string().required()
    })
}

module.exports = {
    location
}
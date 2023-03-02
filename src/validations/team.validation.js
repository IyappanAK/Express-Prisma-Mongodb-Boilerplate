
const Joi = require('joi');

const updateUserByTeam = {
    body: Joi.object().keys({
      name : Joi.string().required(),
      teamId: Joi.number(),
      teamName : Joi.string()
    })
  }

const createTeam = {
  body : Joi.object().keys({
    name : Joi.string().required()
  })
}

const teamlistwebvalidate = {
  query : Joi.object().keys({
    pageSize: Joi.string(),
    pageNumber: Joi.string(),
    searchString: Joi.string(),
  })
}

const teamUserList = {
  query : Joi.object().keys({
    teamId: Joi.number().required(),
    pageSize: Joi.string().required(),
    pageNumber: Joi.string().required(),
    searchString: Joi.string(),
  })
}


module.exports = {
    updateUserByTeam,
    createTeam,
    teamlistwebvalidate,
    teamUserList
    
}
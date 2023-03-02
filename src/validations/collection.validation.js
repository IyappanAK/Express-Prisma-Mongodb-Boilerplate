const Joi = require('joi');

const creatNewList = {
    body: Joi.object().keys({
      locationId : Joi.number().required(),
      width : Joi.number(),
      latitude : Joi.string(),
      longitude : Joi.string(),
      depth : Joi.number().required(),
      wastageEgg: Joi.number(),
      distanceOfEgg : Joi.number().required(),
      approxNextTimeId :  Joi.number(),
      noOfEgg : Joi.number(),
      temperature : Joi.number(),
      status : Joi.string().required(),
      imgUrls : Joi.array(),
      height: Joi.number(),
      nestThere : Joi.number()
    })
  }

const updatelist = {
  body : Joi.object().keys({
    id: Joi.number().required(),
    hatcheryId: Joi.number(),
    pitNumber : Joi.number(),
    inchargeName : Joi.string(),
  })  
}
  
const teamorganizationLocationimg = {
  query : Joi.object().keys({
    eggCollectionId: Joi.number().required(),
  })
}
module.exports = {
    creatNewList,
    teamorganizationLocationimg,
    updatelist
}
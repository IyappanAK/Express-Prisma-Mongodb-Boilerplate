const { userStatusType } = require('@prisma/client');
const { join } = require('@prisma/client/runtime');
const { object } = require('joi');
const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    phone_number: Joi.string().required(),
    name: Joi.string(),
    teamId: Joi.number(),
    roleId: Joi.number(),
  }),
};

const getUsersv1 = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
  }),
};

const locationvalidateByUser = {
  query: Joi.object().keys({
    userId: Joi.number().required(),
    pageSize: Joi.string().required(),
    pageNumber: Joi.string().required(),
    searchString: Joi.string(),
  }),
};

const createWebUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    roleId: Joi.number().required(),
    teamId: Joi.number(),
  }),
};

const updateWebUser = {
  body: Joi.object().keys({
    name: Joi.string(),
    phone_number: Joi.string(),
    email: Joi.string(),
    adminUserStatus: Joi.boolean(),
    roleId: Joi.number(),
    teamId: Joi.number(),
  }),
};

const listWebUser = {
  query: Joi.object().keys({
    pageSize: Joi.string().required(),
    pageNumber: Joi.string().required(),
    searchName: Joi.string().allow(''),
  }),
};

const listWebUserById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUsersv1,
  locationvalidateByUser,
  createWebUser,
  updateWebUser,
  listWebUser,
  listWebUserById,
};

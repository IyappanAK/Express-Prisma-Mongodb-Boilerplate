const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, emailService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = async (req, res) => {
  const user = await userService.getusers();
  res.send(user);
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));
  res.send(user);
};
const getUserBytoken = async (req, res) => {
  const id = req.user.id;
  const user = await userService.getUserBytoken(Number(id));
  res.send(user);
};

const getUserByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.params;
  const user = await userService.getUserByPhoneNumber(phoneNumber);
  res.send(user);
};

const deleteUser = async (req, res) => {
  const { phoneNumber } = req.body;
  const deleteUser = await userService.deleteUser(phoneNumber);
  res.send(deleteUser);
};

const locationByuser = async (req, res) => {
  const inputReq = req.query;
  const userDetails = await userService.getUserById(Number(inputReq.userId), false);
  const locationList = await userService.locationListByUserId(Number(inputReq.userId), inputReq);
  res.send({
    userDetails: userDetails,
    locationList: locationList,
  });
};

// Super Admin API For CreateUser

const createWebUsers = catchAsync(async (req, res) => {
  const user = await userService.createWebUsers(req.body);
  await emailService.userCreationEmail(user.email, user);
  res.status(httpStatus.CREATED).json(user);
});

const editWebUsers = catchAsync(async (req, res) => {
  const user = await userService.editWebUsersById(req.body, Number(req.params.id));
  res.json(user);
});

const getWebUsers = catchAsync(async (req, res) => {
  const user = await userService.getWebUsers(req.query);
  res.json(user);
});

const getWebUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getWebUserById(Number(id));
  res.json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByPhoneNumber,
  deleteUser,
  locationByuser,
  createWebUsers,
  editWebUsers,
  getWebUsers,
  locationByuser,
  getUserBytoken,
  getWebUserById,
};

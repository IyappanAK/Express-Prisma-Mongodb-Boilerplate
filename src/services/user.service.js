const httpStatus = require('http-status');
const prisma = require('../prisma');
const ApiError = require('../utils/ApiError');
const commonUtils = require('../utils/commonUtils');

const createUser = async (userBody) => {
  const user = await prisma.User.create({ data: userBody });
  return user;
};

const getusers = async () => {
  const user = await prisma.user.findMany({include:{posts:{select:{title:true},}}})
  const test=await prisma.post.findMany()
  return {user,test};
};

// Best Example With for Pagination and Some Alteration Method 

const getWebUsers = async (data) => {
  const { pageNumber, pageSize, searchName } = data;
  const search = searchName === '' ? undefined : searchName;
  const Skip = (Number(pageNumber) - 1) * Number(pageSize);
  const user = await prisma.User.findMany({
    skip: Skip,
    take: Number(pageSize),
    where: { name: { contains: search, mode: 'insensitive' } },
    include: {
      role: {
        select: {
          role_name: true,
        },
      },
      team: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { id: 'desc' },
  });
  const mapped = user.map((obj) => {
    return {
      ...obj,
      role_name: obj.role.role_name,
      team_name: obj.team == null ? '' : obj.team.name,
    };
  });
  const filtered = mapped.map(({ teamId, password, roleId, role, team, ...rest }) => rest);
  const searchCount = (await prisma.User.findMany({ where: { name: { contains: searchName, mode: 'insensitive' } } }))
    .length;
  const totalCount = searchCount > 10 ? await prisma.egg_Collection.count() : searchCount;
  const totalPages = Math.ceil(totalCount / Number(pageSize));
  return {
    meta: {
      searchCount,
      total: totalCount,
      pageNumber: parseInt(pageNumber),
      pageSize: parseInt(pageSize),
      totalPages: totalPages,
    },
    data: filtered,
  };
};
const getUserByPhoneNumber = async (phoneNumber) => {
  const user = await prisma.user.findFirst({
    where: {
      phone_number: phoneNumber,
    },
    include: { team: true },
  });
  return user ? user : false;
};

const deleteUser = async (phoneNumber) => {
  const user = await getUserByPhoneNumber(phoneNumber);
  const responce = await prisma.user.delete({ where: { id: user.id } });
  return responce ? 'delete' : 'cant';
};

const getUserById = async (userid, addAdditionalInfo) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userid,
    },
    include: {
      team: true,
      Egg_Collection: addAdditionalInfo,
    },
  });
  return user;
};
const getUserBytoken = async (id) => {
  const user = await prisma.user.findFirst({ where: { id: id }, include: { role: true, team: true } });
  if (user) {
    delete user.password;
  }
  return user;
};

const updateUserById = async ({ id, name, email, phone_number, status }) => {
  const response = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
      phone_number: phone_number,
      status: status,
    },
  });
  return response;
};

const updateUserByToken = async (userId, password) => {
  const res = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });
  return res;
};


const getuserByEmail = async (email) => {
  const res = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return res ? res : false;
};

// Super Admin  API For CreateWebUser

const createWebUsers = async (data) => {
  if (data.roleId !== 1) {
    data.password = commonUtils.encrypt('User@' + (1000 + Math.floor(Math.random() * 9000)));
  }
  if (data.roleId != 1 && data.teamId) {
    throw new ApiError(httpStatus[400], 'invalid Role Id');
  }
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    throw new ApiError(httpStatus[400], 'email already exists');
  }
  return await prisma.User.create({ data });
};

const editWebUsersById = async (body, id) => {
  const user = await prisma.User.update({
    where: { id },
    data: {
      name: body.name,
      phone_number: body.phone_number,
      email: body.email,
      adminUserStatus: body.adminUserStatus,
      teamId: body.teamId,
      roleId: body.roleId,
    },
  });
  return user;
};



const getWebUserById = async (userid) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userid,
    },
    include: {
      team: true,
      role: true,
    },
  });

  if (user) {
    delete user.password;
  }
  return user;
};

module.exports = {
  getUserByPhoneNumber,
  createUser,
  getusers,
  getUserById,
  updateUserById,
  deleteUser,
  getuserByEmail,
  updateUserByToken,
  createWebUsers,
  editWebUsersById,
  getWebUsers,
  updateUserByToken,
  getUserBytoken,
  getWebUserById,
};

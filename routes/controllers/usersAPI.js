const jwt = require('jsonwebtoken');
// const fsProm = require('fs/promises');
// const path = require('path');
const { HttpCode } = require('../../helpers/constants');
const UserModel = require('../models/userModel');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (req, res, next) => {
  const { email, name, sex, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email in use',
    });
  }

  const newUser = await UserModel.create({ email, name, sex, password });
  return res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    data: {
      user: {
        id: newUser.id, //_id
        name: newUser.name,
        email: newUser.email,
        sex: newUser.subscription,
      },
    },
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const { _id } = user;
    const payload = { _id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    const result = await UserModel.findOneAndUpdate(
      { _id },
      { token },
      { new: true },
    );
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { token: result.token },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, _next) => {
  await UserModel.updateOne({ _id: req.user.id }, { token: null });
  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = {
  registration,
  login,
  logout,
};

// const handlerReturn = (result, successCode = 200) => ({
//   code: result ? successCode : 404,
//   data: result ? result : { status: 'error', message: 'Not found' },
// });

// const handlerMongoGetAll = async Model => {
//   const result = await Model.find({});
//   return handlerReturn(result);
// };

// const handlerMongoGetById = async (Model, req) => {
//   const result = await Model.findOne({ _id: req.params.id });
//   return handlerReturn(result);
// };

// const handlerMongoPost = async (Model, req) => {
//   const result = await Model.create(req.body);
//   return handlerReturn(result, 201);
// };

// const handlerMongoDelete = async (Model, req) => {
//   const result = await Model.findOneAndRemove({ _id: req.params.id });
//   return handlerReturn(result);
// };

// const handlerMongoPatch = async (Model, req) => {
//   const result = await Model.findOneAndUpdate(
//     { _id: req.params.id },
//     req.body,
//     { new: true },
//   );
//   return handlerReturn(result);
// };

// const controller = (handlerMongo, Model) => async (req, res, next) => {
//   try {
//     const { code, data } = await handlerMongo(Model, req);
//     return res.status(code).send(data);
//   } catch (err) {
//     next(err);
//   }
// };

// const getDataMongo = controller(handlerMongoGetAll, CommentModel);
// const getByIdDataMongo = controller(handlerMongoGetById, CommentModel);
// const postDataMongo = controller(handlerMongoPost, CommentModel);
// const deleteDataMongo = controller(handlerMongoDelete, CommentModel);
// const patchDataMongo = controller(handlerMongoPatch, CommentModel);

// module.exports = {
//   getDataMongo,
//   getByIdDataMongo,
//   postDataMongo,
//   deleteDataMongo,
//   patchDataMongo,
// };

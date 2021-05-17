const jwt = require('jsonwebtoken');
const { HttpCode } = require('../../helpers/constants');
const UserModel = require('../models/userModel');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (req, res, next) => {
  const { email, name, sex, password } = req.body;
  //   const user = await UserModel.findOne({ email });
  const user = await UserModel.findByEmail({ email });
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
    const user = await UserModel.findByEmail({ email });
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
    const result = await UserModel.updateToken({ _id, token });
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
  //   await UserModel.updateOne({ _id: req.user.id }, { token: null });
  await UserModel.updateToken({ _id: req.user.id, token: null });
  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = {
  registration,
  login,
  logout,
};

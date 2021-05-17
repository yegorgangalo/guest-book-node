const CommentModel = require('../models/commentModel');
const { HttpCode } = require('../../helpers/constants');

const handlerReturn = (result, successCode = HttpCode.OK) => ({
  code: result ? successCode : HttpCode.NOT_FOUND,
  data: result ? result : { status: 'error', message: 'Not found' },
});

const handlerMongoGetAll = async (Model, req) => {
  const result = await Model.find({ owner: req.user.id }).populate({
    path: 'owner',
    select: 'email -_id',
  });
  return handlerReturn(result);
};

const handlerMongoGetById = async (Model, req) => {
  const result = await Model.findOne({
    _id: req.params.id,
    owner: req.user.id,
  }).populate({
    path: 'owner',
    select: 'email -_id',
  });
  return handlerReturn(result);
};

const handlerMongoPost = async (Model, req) => {
  const result = await Model.create({ ...req.body, owner: req.user.id });
  return handlerReturn(result, HttpCode.CREATED);
};

const handlerMongoDelete = async (Model, req) => {
  const result = await Model.findOneAndRemove({
    _id: req.params.id,
    owner: req.user.id,
  });
  return handlerReturn(result);
};

const handlerMongoPatch = async (Model, req) => {
  const result = await Model.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true },
  );
  return handlerReturn(result);
};

const controller = (handlerMongoRequest, Model) => async (req, res, next) => {
  try {
    const { code, data } = await handlerMongoRequest(Model, req);
    return res.status(code).send(data);
  } catch (err) {
    next(err);
  }
};

const getDataMongo = controller(handlerMongoGetAll, CommentModel);
const getByIdDataMongo = controller(handlerMongoGetById, CommentModel);
const postDataMongo = controller(handlerMongoPost, CommentModel);
const deleteDataMongo = controller(handlerMongoDelete, CommentModel);
const patchDataMongo = controller(handlerMongoPatch, CommentModel);

module.exports = {
  getDataMongo,
  getByIdDataMongo,
  postDataMongo,
  deleteDataMongo,
  patchDataMongo,
};

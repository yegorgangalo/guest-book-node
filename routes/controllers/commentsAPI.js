const { CommentModel } = require('../../db/dbMySQL');

const handlerReturn = (result, successCode = 200) => ({
  code: result ? successCode : 404,
  data: result ? result : { status: 'error', message: 'Not found' },
});

const handlerDBGetAll = async Model => {
  const result = await Model.findAll();
  const newResult = result.map(({ id, name, comment }) => ({
    _id: id,
    name,
    comment,
  }));
  return handlerReturn(newResult);
};

const handlerDBGetById = async (Model, req) => {
  const { id, name, comment } = await Model.findOne({
    where: { id: req.params.id },
  });
  return handlerReturn({ _id: id, name, comment });
};

const handlerDBPost = async (Model, req) => {
  const { id, name, comment } = await Model.create(req.body);
  return handlerReturn({ _id: id, name, comment }, 201);
};

const handlerDBDelete = async (Model, req) => {
  const result = await Model.destroy({
    where: { id: req.params.id },
  });
  return handlerReturn(result);
};

const handlerDBPatch = async (Model, req) => {
  await Model.update(req.body, { where: { id: req.params.id } });
  const { id, name, comment } = await Model.findOne({
    where: { id: req.params.id },
  });
  return handlerReturn({ _id: id, name, comment });
};

const controller = (handlerDB, Model) => async (req, res, next) => {
  try {
    const { code, data } = await handlerDB(Model, req);
    return res.status(code).json(data);
  } catch (err) {
    next(err);
  }
};

const getDataDB = controller(handlerDBGetAll, CommentModel);
const getByIdDataDB = controller(handlerDBGetById, CommentModel);
const postDataDB = controller(handlerDBPost, CommentModel);
const deleteDataDB = controller(handlerDBDelete, CommentModel);
const patchDataDB = controller(handlerDBPatch, CommentModel);

module.exports = {
  getDataDB,
  getByIdDataDB,
  postDataDB,
  deleteDataDB,
  patchDataDB,
};

// const { CommentModel } = require('../models/models');

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

const express = require('express');
const router = express.Router();
const {
  validateCreateComment,
  validateUpdateComment,
} = require('./validation/validationComments');
const {
  getDataMongo,
  getByIdDataMongo,
  postDataMongo,
  deleteDataMongo,
  patchDataMongo,
} = require('./controllers/commentsAPI');
const guard = require('../helpers/guard');

router
  .get('/', guard, getDataMongo)
  .post('/', guard, validateCreateComment, postDataMongo);

router
  .get('/:id', guard, getByIdDataMongo)
  .delete('/:id', guard, deleteDataMongo)
  .patch('/:id', guard, validateUpdateComment, patchDataMongo);

module.exports = router;

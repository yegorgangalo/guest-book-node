const express = require('express');
const router = express.Router();
const {
  validateCreateComment,
  validateUpdateComment,
} = require('./validation/validationComments');
const {
  getDataDB,
  getByIdDataDB,
  postDataDB,
  deleteDataDB,
  patchDataDB,
} = require('./controllers/commentsAPI');

router.get('/', getDataDB).post('/', validateCreateComment, postDataDB);

router
  .get('/:id', getByIdDataDB)
  .delete('/:id', deleteDataDB)
  .patch('/:id', validateUpdateComment, patchDataDB);

module.exports = router;

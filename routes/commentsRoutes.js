const express = require('express')
const router = express.Router()
const {validateCreateComment, validateUpdateComment} = require('./validation/validationComments')
const {getDataMongo, getByIdDataMongo, postDataMongo, deleteDataMongo, patchDataMongo} = require('./controllers/commentsAPI')

router
    .get('/', getDataMongo)
    .post('/', validateCreateComment, postDataMongo)

router
    .get('/:id', getByIdDataMongo)
    .delete('/:id', deleteDataMongo)
    .patch('/:id', validateUpdateComment, patchDataMongo)

module.exports = router
const express = require('express')
const router = express.Router()
const {validateComment} = require('./validation/validationComments')
const { CommentModel } = require('./models/models')
const {getDataMongo, postDataMongo, deleteDataMongo, patchDataMongo} = require('./api/commentsAPI')

router
    .get('/', getDataMongo(CommentModel))
    .post('/', validateComment, postDataMongo(CommentModel))

router
    .delete('/:id', deleteDataMongo(CommentModel))
    .patch('/:id', validateComment, patchDataMongo(CommentModel))

module.exports = router
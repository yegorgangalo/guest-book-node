const express = require('express')
const router = express.Router()
const { CommentModel } = require('../models/models')
const { getDataMongo, postDataMongo, deleteDataMongo, patchDataMongo } = require('../api/apilogic');

router
    .get('/', getDataMongo(CommentModel))
    .post('/', postDataMongo(CommentModel))

router
    .delete('/:id', deleteDataMongo(CommentModel))
    .patch('/:id', patchDataMongo(CommentModel))

module.exports = router
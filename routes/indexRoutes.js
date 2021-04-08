const express = require('express');
const router = express.Router();
const { renderMainServerPage, renderCommentsServerPage } = require('./controllers/indexAPI')
const { CommentModel } = require('./models/models')

router.get('/', renderMainServerPage);
router.get('/comments', renderCommentsServerPage(CommentModel));

module.exports = router;

const express = require('express');
const router = express.Router();

const renderMainServerPage = (req, res) => {
  res.render('index', { title: 'Guest-Book Back-End' })
}

router.get('/', renderMainServerPage);

module.exports = router;

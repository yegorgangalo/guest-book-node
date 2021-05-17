const express = require('express');
const router = express.Router();
const { validateCreateUser } = require('./validation/validationUser');
const { registration, login, logout } = require('./controllers/usersAPI');
const guard = require('../helpers/guard');

router.post('/registration', validateCreateUser, registration);
router.post('/login', login);
router.post('/logout', guard, logout);

module.exports = router;

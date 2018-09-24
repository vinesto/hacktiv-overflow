var express = require('express');
var router = express.Router();
var { login, register, getOneUser } = require('../controllers/users')

/* GET users listing. */
router.get('/', getOneUser)

router.post('/login', login)
router.post('/register', register)

module.exports = router;

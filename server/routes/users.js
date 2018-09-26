var express = require('express');
var router = express.Router();
var { login, register, getOneUser, loginGoogle, loginFb } = require('../controllers/users')

/* GET users listing. */
router.get('/', getOneUser)

router.post('/login', login)
router.post('/loginGoogle', loginGoogle)
router.post('/loginFb', loginFb)
router.post('/register', register)

module.exports = router;

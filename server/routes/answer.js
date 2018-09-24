var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var { createAnswer, updateAnswer, getOneAnswer, upVoteAnswer, downVoteAnswer, getMyAnswer } = require('../controllers/answers')
/* GET users listing. */
router.get('/', authentication, getMyAnswer)
router.get('/:answerId', getOneAnswer)

router.post('/:questionId', authentication, createAnswer)
router.put('/:answerId', authentication, updateAnswer)
router.post('/upvote/:answerId', authentication, upVoteAnswer)
router.post('/downvote/:answerId', authentication, downVoteAnswer)

module.exports = router;

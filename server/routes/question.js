var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var { createQuestion, deleteQuestion, updateQuestion, getAllQuestion, getMyQuestion, getOneQuestion, upVoteQuestion, downVoteQuestion } = require('../controllers/questions')

// /* GET users listing. */
router.get('/', getAllQuestion)
router.get('/user', authentication, getMyQuestion)
router.get('/:id', getOneQuestion)

router.post('/', authentication, createQuestion)
router.delete('/:id', authentication, deleteQuestion)
router.put('/:id', authentication, updateQuestion)
router.post('/upvote/:id', authentication, upVoteQuestion)
router.post('/downvote/:id', authentication, downVoteQuestion)

module.exports = router;

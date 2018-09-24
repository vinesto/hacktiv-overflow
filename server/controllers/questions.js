const Question = require('../models/question')

const createQuestion = function (req, res) {
    let { title, question } = req.body
    Question.create({
        userId: req.user.id,
        title: title,
        question: question
    })
        .then(function (newUser) {
            res.status(200).json({
                message: "create question success",
                data: newUser
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "create question failed",
                error: err.message
            })
        })
}

const deleteQuestion = function (req, res) {
    Question.findOneAndRemove({
        _id: req.params.id,
        userId: req.user.id
    })
        .then(function (result) {
            if (result) {
                res.status(200).json({
                    message: "delete success"
                })
            } else {
                res.status(400).json({
                    message: "you are not authorized to access this"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "delete question failed"
            })
        })
}

const getAllQuestion = function (req, res) {
    Question.find({})
        .sort({ 'totalVotes': 'desc' })
        .populate('userId')
        .populate({ path: 'answerId', options: { sort: { 'totalVotes': 'desc' } } })
        .populate('upVote')
        .populate('downVote')
        .exec()
        .then(function (questions) {
            res.status(200).json({
                message: 'data found',
                data: questions
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: 'data not found',
                error: err.messages
            })
        })
}

const getOneQuestion = function (req, res) {
    Question.findOne({
        _id: req.params.id
    })
        .sort({ 'totalVotes': 'desc' })
        .populate('userId')
        .populate({ path: 'answerId', options: { sort: { 'totalVotes': 'desc' } } })
        .populate('upVote')
        .populate('downVote')
        .exec()
        .then(function (question) {
            res.status(200).json({
                message: 'data found',
                data: question
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: 'data not found',
                error: err.messages
            })
        })
}

const getMyQuestion = function (req, res) {
    console.log('ini req userr id',req.user.id);
    Question.find({
        userId: req.user.id
    })
        .sort({ 'totalVotes': 'desc' })
        .populate('userId')
        .populate({ path: 'answerId', options: { sort: { 'totalVotes': 'desc' } } })
        .populate('upVote')
        .populate('downVote')
        .exec()
        .then(function (questions) {
            res.status(200).json({
                message: 'data found',
                data: questions
            })
        })
        .catch(function (err) {
            console.log(err.messages);
            res.status(400).json({
                message: 'data not found',
                error: err.messages
            })
        })
}

const updateQuestion = function (req, res) {
    let { title, question } = req.body
    let objForUpdate = {}

    if (title) objForUpdate.title = title
    if (question) objForUpdate.question = question

    var setObj = { $set: objForUpdate }
    Question.findOneAndUpdate({
        _id: req.params.id,
        userId: req.user.id
    }, setObj)
        .then(function (question) {
            if (question) {
                res.status(200).json({
                    message: "update success",
                    data: question
                })
            } else {
                res.status(400).json({
                    message: "you are not authorize to access this"
                })
            }
        })
        .catch(function (err) {
            res.status(500).json({
                message: "update failed",
                error: err.message
            })
        })

}

const upVoteQuestion = function (req, res) {
    Question.findOne({ _id: req.params.id })
        .then(function (question) {
            if (String(question.userId) !== String(req.user.id)) {
                Question.update({ _id: req.params.id }, {
                    $addToSet: { upVote: req.user.id },
                    $pull: { downVote: req.user.id }
                })
                    .then(function (result) {
                        Question.findOne({ _id: req.params.id })
                            .then(function (newQuestion) {
                                let totalVote = newQuestion.upVote.length - newQuestion.downVote.length
                                Question.update({ _id: req.params.id }, {
                                    $set: { totalVotes: totalVote }
                                })
                                    .then(function (fixResult) {
                                        res.status(200).json({
                                            message: "Upvote Success",
                                            data: fixResult
                                        })
                                    })
                            })
                    })
                    .catch(function (err) {
                        res.status(400).json({
                            message: "up vote failed",
                            error: err.message
                        })
                    })
            } else {
                res.status(400).json({
                    message: 'you are not authorized to vote your own question question'
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: 'question not found',
                error: err.message
            })
        })
}

const downVoteQuestion = function (req, res) {
    Question.findOne({ _id: req.params.id })
        .then(function (question) {
            if (String(question.userId) !== String(req.user.id)) {
                Question.update({ _id: req.params.id }, {
                    $addToSet: { downVote: req.user.id },
                    $pull: { upVote: req.user.id }
                })
                    .then(function (result) {
                        Question.findOne({ _id: req.params.id })
                            .then(function (newQuestion) {
                                let totalVote = newQuestion.upVote.length - newQuestion.downVote.length
                                Question.update({ _id: req.params.id }, {
                                    $set: { totalVotes: totalVote }
                                })
                                    .then(function (fixResult) {
                                        res.status(200).json({
                                            message: "Down vote Success",
                                            data: fixResult
                                        })
                                    })
                            })
                    })
                    .catch(function (err) {
                        res.status(400).json({
                            message: "Down vote failed",
                            error: err.message
                        })
                    })
            } else {
                res.status(400).json({
                    message: 'you are not authorized to vote your own question question'
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: 'question not found',
                error: err.message
            })
        })
}

module.exports = { createQuestion, deleteQuestion, updateQuestion, getAllQuestion, getMyQuestion, getOneQuestion, upVoteQuestion, downVoteQuestion }
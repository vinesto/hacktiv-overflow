const Answer = require('../models/answer')
const Question = require('../models/question')

const createAnswer = function (req, res) {
    Answer.create({
        answer: req.body.answer,
        userId: req.user.id,
        userName: req.user.name
    })
        .then(function (answer) {
            Question.findOneAndUpdate({
                _id: req.params.questionId,
            }, {
                    $push: { answerId: answer._id }
                })
                .then(function (question) {
                    if (question) {
                        res.status(200).json({
                            message: "add answer success",
                        })
                    } else {
                        res.status(200).json({
                            message: "question not found"
                        })
                    }
                })
                .catch(function (err) {
                    res.status(400).json({
                        message: "add answer failed",
                        error: err.message
                    })
                })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "error create answer",
                error: err.message
            })
        })
}

const updateAnswer = function (req, res) {
    let { answer } = req.body
    let objForUpdate = {}

    if (answer) objForUpdate.answer = answer

    var setObj = { $set: objForUpdate }

    Answer.findOneAndUpdate({
        _id: req.params.answerId,
        userId: req.user.id
    }, setObj)
        .then(function (answer) {
            if (answer) {
                res.status(200).json({
                    message: "update answer success",
                    data:answer
                })
            } else {
                res.status(400).json({
                    message: "you are not authorized to access this"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "update answer failed"
            })
        })
}

const getOneAnswer = function (req, res) {
    Answer.findOne({
        _id: req.params.answerId
    })
        .then(function (answer) {
            res.status(200).json({
                message: "data found",
                data: answer
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "data not found",
                error: err.message
            })
        })
}

const getMyAnswer = function (req, res) {
    Answer.find({ userId: req.user.id })
        .then(function (answers) {
            res.status(200).json({
                message: "data found",
                data: answers
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "data not found",
                error: err.message
            })
        })
}

const upVoteAnswer = function (req, res) {
    Answer.findOne({ _id: req.params.answerId })
        .then(function (answer) {
            if (String(answer.userId) !== String(req.user.id)) {
                Answer.update({ _id: req.params.answerId }, {
                    $addToSet: { upVote: req.user.id },
                    $pull: { downVote: req.user.id }
                })
                    .then(function (result) {
                        Answer.findOne({ _id: req.params.answerId })
                            .then(function (newAnswer) {
                                let totalVote = newAnswer.upVote.length - newAnswer.downVote.length
                                Answer.update({ _id: req.params.answerId }, {
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
                    message: 'you are not authorized to vote your own answer'
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: 'answer not found',
                error: err.message
            })
        })
}

const downVoteAnswer = function (req, res) {
    Answer.findOne({ _id: req.params.answerId })
        .then(function (answer) {
            if (String(answer.userId) !== String(req.user.id)) {
                Answer.update({ _id: req.params.answerId }, {
                    $addToSet: { downVote: req.user.id },
                    $pull: { upVote: req.user.id }
                })
                    .then(function (result) {
                        Answer.findOne({ _id: req.params.answerId })
                            .then(function (newAnswer) {
                                let totalVote = newAnswer.upVote.length - newAnswer.downVote.length
                                Answer.update({ _id: req.params.answerId }, {
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
                    message: 'you are not authorized to vote your own answer'
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: 'answer not found',
                error: err.message
            })
        })
}

module.exports = { createAnswer, updateAnswer, getOneAnswer, upVoteAnswer, downVoteAnswer, getMyAnswer }

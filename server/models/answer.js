const mongoose = require('mongoose')
const Schema = mongoose.Schema

var answerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answer:{
        type:String,
        required:[true, 'answer is required']
    },
    userName: String,
    totalVotes: {
        type: Number,
        default: 0
    },
    upVote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

var Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer
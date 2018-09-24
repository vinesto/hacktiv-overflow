const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:[true, 'title is required']
    },
    question:{
        type:String,
        required:[true, 'title is required']
    },
    answerId:[{
        type: Schema.Types.ObjectId,
        ref:'Answer'
    }],
    totalVotes:{
        type:Number,
        default:0
    },
    upVote:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    downVote:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
},{
    timestamps:true
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question
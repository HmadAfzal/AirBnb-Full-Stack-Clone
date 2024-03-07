const mongoose = require('mongoose');


const reviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5},
    Comment:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }
})

const Review= new mongoose.model("Review", reviewSchema)

module.exports=Review;
// "Review Model — jab user koi code review karega, uska data kaise save hoga MongoDB mein — ye blueprint hai"


const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
    line : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        enum : ['error','warning','success'],
        required : true
    },
    message : {
        type : String,
        required : true
    }
});


const reviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    repoUrl : {
        type : String,
        required : true
    },

    fileName : {
        type : String,
        required : true
    }, 
    code : {
        type : String,
        required : true
    },
    suggestions : [suggestionSchema]
} , {
    timestamps : true
});

module.exports = mongoose.model('Review', reviewSchema);
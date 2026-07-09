const mongoose = require('mongoose');
//built model for saving chat messages in database

//for every message in chat, we will have role and content
const messageSchema = new mongoose.Schema({
            role: {
                type: String,
                enum: ['user','assistant'],
                required: true
            },

            content: {
                type: String,
                required: true
            }
})


//entity for chat
const chatSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        default: 'New Chat'
    },
    messages : [messageSchema]
},{
    timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);
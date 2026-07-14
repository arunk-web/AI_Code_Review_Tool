const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email :{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    },
    messageCount: {
        type: Number,
        default : 0
    },
    lastResetTime : {
        type: Date,
        default: Date.now
    }
}, {
    timestamps:true
});


// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     // "pehle directly 10 pass kar rahe the — bcrypt ka sahi tarika hai pehle salt generate karo phir us salt se hash karo"
//     next();
// });


userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


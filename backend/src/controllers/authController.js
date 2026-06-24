// "Controller wo code hota hai jo actual 
// kaam karta hai — jaise Signup mein: user ka data lo, validate karo, 
// database mein save karo, token banao, 
// response bhejo. Route sirf kehta hai 'is URL pe ye controller use karo'"


const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};


const signup = async (req, res) => {
    try {
        const {name,email,password} = req.body;
        // "frontend se jo data aaya usse destructure kiya — req.body 
        // mein sara data hota hai jo user ne form mein bhara"

        if(!name || !email || !password) {
            return res.status(400).json({message : 'Please fill all the fields'});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // const user = new User({name,email,password});
        // // "naya user database mein banao — password automatically encrypt ho jaayega kyunki humne pre save hook lagaya tha User model mein"
        // await user.save();

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });


        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    }  catch (error) {
        console.log(error);
        res.status(500).json({message : error.message});
    }
};


const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({message : 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({message : 'Invalid email or password'});
        }

        res.json({
            _id: user._id,
            name : user.name,
            email:user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message });
    }
};

module.exports = {signup, login};

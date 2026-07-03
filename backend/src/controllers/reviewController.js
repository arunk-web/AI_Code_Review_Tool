const Review = require('../models/review');
const axios = require('axios');


const createReview = async(req,res) => {
    try {
        const {fileName, code} = req.body;

        if(!fileName || !code) {
            return res.status(400).json({message : "fileName and code are required"});
        }

        // openAI call       OpenAI ke server pe request bhej rahe hain — gpt-3.5-turbo model use kar rahe hain jo code analyze karega
        const aiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model : 'gpt-3.5-turbo',
                messages: [
                    {
                        role : 'system',
                        content: `You are a code reviewer. Analyse the code and return only a JSON array of suggestions.
                        Each suggestion must have : line(number),type(error/warning/success),message(string).
                        Example: [{"line" : 1, "type" : "warning", "message" :  "Use const instead of var"}]`
                    },
                    {
                        role : 'user',
                        content: `Review this code:\n\n${code}`
                    }
                ],
                temperature : 0.3
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type' : 'application/json'
                }
            }
        );


        //parse the response from AI
        const aiText = aiResponse.data.choices[0].message.content;
        const suggestions = JSON.parse(aiText);

        //save the review in DB
        const review = await Review.create({
            user : req.user._id,
            
            fileName,
            code,
            suggestions
        });

        res.status(201).json(review);
    }
     catch(error) {
        console.log(error);
        res.status(500).json({message: error.message});
     }
};


const getReviews = async (req,res) => {
    try {
        const reviews = await Review.find({user: req.user._id})
            .sort({createdAt: -1})
            .select('-code');

            res.json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};


const getReviewById = async (req,res) => {
    try {
        const review = await Review.findById(req.params.id);

        if(!review) {
            return res.status(404).json({message: 'Did not get review'});
        }

        //security check     ye authorization check hai.
        if(review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: 'did not get access'});
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};


module.exports = {createReview, getReviews, getReviewById};
const Review = require('../models/Review');
const Groq = require('groq-sdk');

const createReview = async (req, res) => {
  try {
    const { fileName, code } = req.body;

    if (!fileName || !code) {
      return res.status(400).json({ message: 'File name aur code dono chahiye' });
    }

    // Groq andar banao — dotenv pehle load ho jaata hai
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert code reviewer like a senior software engineer. Analyze the code and return ONLY a JSON array of suggestions.

            For each issue found:
            - Identify the exact problem
            - Explain why it is wrong
            - Give the correct solution/fix

            Focus on:
            - Actual bugs and logical errors
            - Runtime errors or edge cases missed
            - Wrong algorithm or incorrect logic
            - Memory leaks or performance issues
            - Missing error handling
            - Time/Space complexity improvements

            DO NOT suggest:
            - Variable renaming
            - Code style preferences  
            - Minor naming conventions

            Each suggestion must have:
            - line (number): which line has the issue
            - type (error/warning/success): severity
            - message (string): explain the problem AND provide the fix/solution

            Return ONLY the JSON array, no extra text, no markdown.
            Example: [{"line": 5, "type": "error", "message": "Bug: arr[i] can go out of bounds when array is empty. Fix: Add a check at the start — if(arr.empty()) return {-1,-1};"}]`
        },
        {
          role: 'user',
          content: `Review this code:\n\n${code}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
    });

    const aiText = completion.choices[0].message.content;
    const cleanText = aiText.replace(/```json|```/g, '').trim();
    const suggestions = JSON.parse(cleanText);

    const review = await Review.create({
      user: req.user._id,
      fileName,
      code,
      suggestions
    });

    res.status(201).json(review);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-code');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review nahi mila' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Access nahi hai' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getReviews, getReviewById };
const express = require('express');
const router = express.Router();
// "express ka Router use kar rahe hain — ye ek mini app jaisa hai jisme sirf auth se related routes honge. Sab kuch ek jagah organized rehta hai"





const {signup, login} = require('../controllers/authController');

router.post('/signup',signup);
router.post('/login',login);
// "POST /signup pe request aaye toh signup function chalao. POST /login pe request aaye toh login function chalao. POST isliye kyunki data bhej rahe hain — form data"

module.exports = router;
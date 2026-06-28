const express = require('express');
const router = express.Router();
const {createReview , getReviews , getReviewById } = require('../controllers/reviewController');
const {protect} = require('../middleware/authmiddleware');

router.post('/', protect, createReview);
//"pehle protect chalega — token check karega. Token valid hai toh createReview chalega. Ye middleware chain hai — ek ke baad ek"
router.get('/',protect, getReviews);
router.get('/:id' , protect, getReviewById);


module.exports = router;





















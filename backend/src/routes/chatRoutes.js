const express = require('express');
const router = express.Router();
const {chat, getChats, getChatById, deleteChat} = require('../controllers/chatController');
const {protect} = require('../middleware/authMiddleware');

router.post('/',protect,chat);
router.get('/', protect,getChats);
router.get('/:id',protect , getChatById);
router.delete('/:id', protect, deleteChat);


module.exports = router;

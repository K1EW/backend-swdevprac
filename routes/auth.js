const express = require('express');
const { register, login, getUser } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, register);
router.post('/login', protect, login);
router.get('/user/:id', protect, getUser);
// router.get('/me', protect, getMe);
// router.get('/logout', logout);

module.exports = router;

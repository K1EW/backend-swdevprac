const express = require('express');
const { register, login } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, register);
router.post('/login', protect, login);
// router.get('/me', getMe);
// router.get('/logout', logout);

module.exports = router;

const express = require('express');
const { register, login } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.get('/me', getMe);
// router.get('/logout', logout);

module.exports = router;

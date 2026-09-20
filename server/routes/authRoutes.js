const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('✅ authRoutes loaded');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleAuth);
router.get('/me', authMiddleware, authController.getMe);

router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth service operational' });
});

module.exports = router;

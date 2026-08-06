const express = require('express');
console.log('✅ authRoutes loaded');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Auth root works' });
});
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth test route works' });
});

module.exports = router;

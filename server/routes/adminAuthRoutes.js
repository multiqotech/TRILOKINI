const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const { adminLogin, adminVerify } = require('../controllers/adminAuthController');

// Public: admin login
router.post('/login', adminLogin);

// Protected: verify token is still valid
router.get('/verify', requireAdmin, adminVerify);

module.exports = router;

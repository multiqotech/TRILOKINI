const { signAdminToken } = require('../middleware/auth');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@trilokini.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Trilokini@Admin2024';

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signAdminToken({ email, role: 'admin' });

    res.json({ token, email, role: 'admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminVerify = async (req, res) => {
  // req.adminUser is set by requireAdmin middleware
  res.json({ email: req.adminUser.email, role: req.adminUser.role });
};

module.exports = { adminLogin, adminVerify };

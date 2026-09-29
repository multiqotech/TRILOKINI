const jwt = require('jsonwebtoken');
const { getFirebaseAdmin } = require('../config/firebaseAdmin');
const { getAuth } = require('firebase-admin/auth');
const User = require('../models/User');

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'trilokini-admin-secret';

// ── Firebase user auth (for frontend customer routes) ──────────────────────────
async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const admin = getFirebaseAdmin();
    const app = admin.getApp();
    const decoded = await getAuth(app).verifyIdToken(token);
    req.firebaseUser = decoded;
    next();
  } catch (error) {
    console.error("Firebase auth error:", error);
    res.status(401).json({ message: error.message || 'Invalid or expired session' });
  }
}

// ── Admin JWT auth (for admin panel routes) ────────────────────────────────────
function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }

    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: admin access only' });
    }
    req.adminUser = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired admin session' });
  }
}

// ── Issue an admin JWT (called from admin login endpoint) ──────────────────────
function signAdminToken(payload) {
  return jwt.sign(payload, ADMIN_JWT_SECRET, { expiresIn: '8h' });
}

module.exports = { requireAuth, requireAdmin, signAdminToken };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Must be logged in (valid token)
exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(id);
        if (!req.user) throw new Error('User not found');
        next();
    } catch {
        res.status(401).json({ message: 'Not authorized' });
    }
};

// Must have one of the allowed roles
exports.authorize = (...roles) => (req, res, next) => 
    roles.includes(req.user.role) ? next() : res.status(403).json({ message: 'Not allowed' });
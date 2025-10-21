import jwt from 'jsonwebtoken'
import User from '../Models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization || req.headers?.Authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, error: 'Authorization header missing' });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ success: false, error: 'Authorization header malformed' });
        }

        const token = parts[1]; 
        if (!token) {
            return res.status(401).json({ success: false, error: 'Token not provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            return res.status(401).json({ success: false, error: 'Token not valid' });
        }

        const userId = decoded.id || decoded._id || decoded.userId;
        if (!userId) {
            return res.status(401).json({ success: false, error: 'Token payload missing user id' });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('authMiddleware error:', error);
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
}

export default verifyUser
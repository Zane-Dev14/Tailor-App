const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { authId, password } = req.body;

        // Find user by authId
        const user = await User.findOne({ authId });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.register = async (req, res) => {
    try {
        const { authId, password } = req.body;
        let user = await User.findOne({ authId });

        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        user = new User({ authId, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(name, email, hashedPassword, role || 'user');
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send('Registration failed');
    }
};

const login = async (req, res) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).send('Invalid credentials');
        }
        
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).send('Login failed');
    }
};

module.exports = { register, login };
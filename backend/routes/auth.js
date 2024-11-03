const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const jwt_SECRET = "Hritikbhau"; // This should be in an environment variable

// Route 1: Register a user using POST "/api/auth/"
router.post('/',
    [
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
        body('email').isEmail().withMessage('Not a valid email address')
    ],
    async (req, res) => {
        let success= false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(password, salt);

            user = new User({
                name,
                password: secpass,
                email,
            });

            await user.save();

            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, jwt_SECRET);
            success=true;
            res.json({ message: 'User created successfully', authToken,success });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);

// Route 2: Authenticate a user using POST "/api/auth/login". No login required
router.post('/login',
    [
        body('password', 'Password cannot be blank').exists(),
        body('email').isEmail().withMessage('Not a valid email address')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                success=false
                return res.status(400).json({success, error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success=false
                return res.status(400).json({success, error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, jwt_SECRET);
            success=true;
            res.json({ message: 'User logged in successfully', success,authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);

// Route 3: Get logged in user details using POST "/api/auth/getUser". Login required
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;

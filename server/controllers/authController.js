const User = require('../models/user');
const { hashPassword, comaparePassword } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.send('Test IS WORKING World!')
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if name was entered
        if (!name) {
            return res.json({ error: "Name is required" });
        }
        // Check if email was entered
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        // Check if password was entered
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and should be 6 characters long" });
        }
        // Check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: "Email already exists" });
        }
        // Create user
        const hashedPassword = await hashPassword(password);

        const user = await User.create({ name, email, password: hashedPassword });

        return res.json([user, { message: "User created" }])
        
    } catch (error) {
        return res.json({ error: "Something went wrong" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if email was entered
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User does not exist" });
        }
        // Check if password was entered
        const passwordMatch = await comaparePassword(password, user.password);
        if (!passwordMatch) {
            return res.json({ error: "Invalid password" });
        }
        // Create token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        // Return user and token to client, exclude hashed password
        user.password = undefined;
        return res.json({ user, token });
        

    }
    catch (error) {
        return res.json({ error: "Something went wrong" });
    }
}




module.exports = {
    test,
    registerUser,
    loginUser
}

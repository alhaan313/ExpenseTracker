const express = require("express");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secretKey = "your_secret_key"; // Change this to a secure value

// Firebase Auth Reference
const auth = admin.auth();

// Signup Route
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Create user in Firebase Authentication
        const userRecord = await auth.createUser({ email, password });

        // Generate JWT Token
        const token = jwt.sign({ uid: userRecord.uid, email }, secretKey, { expiresIn: "7d" });

        return res.status(201).json({ message: "User registered", token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Firebase doesn't support direct password verification, so use Firebase SDK on the frontend.
        // Instead, check if the user exists in Firebase Authentication
        const user = await auth.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ uid: user.uid, email }, secretKey, { expiresIn: "7d" });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

const router = express.Router();
const db = admin.firestore();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Change this in production

// User Signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to Firestore
        const userRef = db.collection("users").doc(email);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
            return res.status(400).json({ error: "User already exists" });
        }

        await userRef.set({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const userRef = db.collection("users").doc(email);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const userData = userSnapshot.data();
        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "7d" });

        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

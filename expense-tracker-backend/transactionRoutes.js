const express = require("express");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const router = express.Router();
const db = admin.firestore();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Ensure this is the same key used in auth

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "No token provided" });

    // console.log(token)
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });

        req.user = decoded; // Attach user email to the request
        next();
    });
};

// Add Transaction
router.post("/add", verifyToken, async (req, res) => {
    const { amount, details, transType } = req.body;
    const email = req.user.email;

    if (!amount || !details || !transType) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newTransaction = {
            id: Date.now(),
            email,
            amount,
            details,
            transType,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        };

        await db.collection("transactions").add(newTransaction);
        return res.status(201).json({ message: "Transaction added", transaction: newTransaction });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Transactions
router.get("/", verifyToken, async (req, res) => {
    const email = req.user.email;

    try {
        const transactionsRef = db.collection("transactions").where("email", "==", email);
        const snapshot = await transactionsRef.get();

        const transactions = [];
        snapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() });
        });

        return res.json({ transactions });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Transaction
router.delete("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const email = req.user.email;

    try {
        // console.log("Trying to delete document with ID:", id);

        const transactionRef = db.collection("transactions").doc(id);
        const doc = await transactionRef.get();
        
        
        if (!doc.exists || doc.data().email !== email) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        await transactionRef.delete();
        return res.json({ message: "Transaction deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

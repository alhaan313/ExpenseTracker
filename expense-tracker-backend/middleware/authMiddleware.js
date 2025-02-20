const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];  // ✅ Extract only the actual token
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid Token" });
    }
};

// utils/jwt.js
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' 

// Sign a JWT with dynamic expiry
export  function signToken(payload, expiresIn) {
    // expiresIn can be like: "30s", "10m", "2h", "7d", etc.
    return  jwt.sign(payload, JWT_SECRET, { expiresIn })
}

// Verify a JWT
export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (err) {
        return null // Token invalid or expired
    }
}

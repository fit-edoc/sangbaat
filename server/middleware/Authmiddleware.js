const jwt = require("jsonwebtoken")

module.exports.verifyToken = (req, res, next) => {
  // Get token from header (common pattern: Authorization: Bearer <token>)
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract token (after "Bearer ")
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify token with your secret
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Attach decoded data to req for downstream use
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

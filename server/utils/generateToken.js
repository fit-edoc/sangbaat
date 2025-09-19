const jwt = require("jsonwebtoken")

/**
 * Generates a JWT token for a given user payload.
 * @param {Object} payload - Data to embed in token (like user id, role).
 * @param {String} expiresIn - Expiration time (default 1h).
 * @returns {String} JWT token
 */
module.exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn });
};

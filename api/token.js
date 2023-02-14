const jwt = require('jsonwebtoken');

// Define your secret key for signing and verifying tokens
const secretKey = process.env.SECRET_KEY;

// Middleware function to verify the token
function verifyToken1(req, res, next) {
  // Get the token from the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // If the token does not exist, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).send({ auth: false, message: 'Failed to authenticate token. The token is Forbidden' });
  }
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'secretKey');
    // Attach the decoded token payload to the request object
    req.user = decoded;
    console.log('decoded is', decoded);
    // Call the next middleware function
    next();
  } catch (err) {
    // If the token is invalid, return a 403 Forbidden response
    return res.status(403).send({ auth: false, message: 'Failed to authenticate token. The token is Forbidden' });
  }
}

module.exports = verifyToken1;
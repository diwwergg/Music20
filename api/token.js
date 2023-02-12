const jwt = require('jsonwebtoken');

const secretKey = 'secretKey';

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(401).send({
      message: 'Unauthorized'
    });
  }
  const token = bearerHeader.split(' ')[1];
  jwt.verify(token, secretKey, (error, data) => {
    if (error) {
      return res.status(401).send({
        message: 'Unauthorized'
      });
    }
    req.userId = data._id;
    next();
  });
}

export default verifyToken;
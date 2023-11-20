const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  //   console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '34m',
  });
  //   console.log(token);
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
module.exports = { generateToken, validateToken };

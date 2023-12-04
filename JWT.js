const { sign, verify } = require("jsonwebtoken");
const secretKey = 'your-secret-key'; 

const createTokens = (user) => {

  const accessToken = sign(
    { username: user.username, id: user.id, role: user.role , location : user.location , specificId: user.specificId },
    secretKey
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'User not Authenticated!' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const decodedToken = verify(accessToken, secretKey);
    req.user = decodedToken; // Attach decoded user information to req.user
    req.authenticated = true;
    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
};

const isSupAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'supAdmin') {
    next();
  } else {
    return res.status(403).json({ error: 'Permission Denied: Only supAdmin can access this resource' });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Permission Denied: Only Admin can access this resource' });
  }
};



module.exports = { createTokens, validateToken ,isSupAdmin,isAdmin };
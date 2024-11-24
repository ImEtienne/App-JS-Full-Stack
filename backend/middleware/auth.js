const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Accès refusé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token invalide' });
  }
};

module.exports = authMiddleware;

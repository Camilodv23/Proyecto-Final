const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, "clave_secreta");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "token invalido o expirado" });
  }
};

module.exports = authMiddleware;

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export const generateJWTToken = (login) => {
  return jwt.sign(
    {login},
    JWT_SECRET,
    { expiresIn: "30min" }
  );
};

export const verifyJWTToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return null
  }
};

export const requireJWTAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Токен не предоставлен" });
  }

  const decoded = verifyJWTToken(token);

  if (decoded) {
    req.user = decoded.login;
    next();
  } else {
    res.status(401).json({success: false, error: `Аутентификация не пройдена` });
  }
};
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // attach user ID to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

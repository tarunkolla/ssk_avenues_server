import jwt from "jsonwebtoken";
import config from "../config/index.mjs";

const { JWT_SECRET } = config;

const auth = (credentials = "PUBLIC") => (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ message: "Invalid token, unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role.includes(credentials.toUpperCase())) {
      req.user = decoded;
      next();
    } else if (credentials) {
      res.status(403).json({ message: "Forbidden" });
    } else {
      res.status(420).json({ message: "Unknown Error" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default auth;

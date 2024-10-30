import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt; 
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" }); // No token provided
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" }); 
    }
    req.user = user;
    next();
  });
};

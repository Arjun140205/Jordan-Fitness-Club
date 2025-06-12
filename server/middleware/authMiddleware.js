import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  console.log("Auth middleware - headers:", req.headers); // Debug

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ message: "No authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No token found in auth header");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    console.log("Verifying token..."); // Debug
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified, user:", decoded); // Debug
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protect;

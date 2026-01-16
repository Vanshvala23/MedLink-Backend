import jwt from "jsonwebtoken";
const authUser = (req, res, next) => {
  if (req.method === "OPTIONS") return next(); // ✅ allow preflight

  try {
    let token = req.headers.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;

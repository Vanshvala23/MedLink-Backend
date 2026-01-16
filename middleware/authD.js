import jwt from "jsonwebtoken";

const authD = (req, res, next) => {
  if (req.method === "OPTIONS") return next(); // ✅

  const token = req.headers.dtoken;
  if (!token) return res.status(401).json({ success: false });

  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ success: false });
  }
};

export default authD;

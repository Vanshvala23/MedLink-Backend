import jwt from "jsonwebtoken";
const authAdmin = (req, res, next) => {
  if (req.method === "OPTIONS") return next(); // ✅

  try {
    const { atoken } = req.headers;
    if (!atoken) return res.status(401).json({ success: false });

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false });
    }
    next();
  } catch {
    res.status(401).json({ success: false });
  }
};

export default authAdmin;
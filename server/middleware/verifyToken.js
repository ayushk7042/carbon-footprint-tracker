import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const user = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
export default verifyToken;

import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer", "");
  if (!token) {
    return res.status(401).json({ message: "access denied" });
  }
  const decoded = jwt.verify(token, "IHatePeople");
  req.user = decoded;
  next();
};

module.exports = authenticate;

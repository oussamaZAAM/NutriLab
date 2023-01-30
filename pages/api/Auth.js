import jwt from "jsonwebtoken";

export default function isAuthenticated(token) {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    return false;
  }
}

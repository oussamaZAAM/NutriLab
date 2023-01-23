import jwt from "jsonwebtoken";

export default function isAuthenticated(token) {
  //   const { authorization } = req.headers;
  //   if (!authorization) return false;
  console.log(token);
  //   const token = authorization.replace("Bearer ", "");
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

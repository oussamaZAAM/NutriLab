import prisma from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default async function login(req, res) {
  const data = req.body;
  console.log(data);
  try {
    const user = await prisma.User.findUnique({
      where: {
        email: data.email,
      },
    });
    // user.password !== data.password &&
    //   res.status(400).json({ message: "Wrong Password" });
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // const refreshPayload = { user: user, jti: uuidv4() };
    const token = jwt.sign(user, process.env.JWT_SECRET);
    console.log(token);
    const serialised = serialize("NutriLab", token, {
      httpOnly: true,
      secure: process.env.MODE_ENV !== "dev",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 14,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);

    res.status(200).json(token);
  } catch (e) {
    res.status(401).json({ message: "Wrong Email" });
  }
}

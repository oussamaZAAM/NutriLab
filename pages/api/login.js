import prisma from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default async function login(req, res) {
  const data = req.body;
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const serialised = serialize("NutriLab", token, {
      httpOnly: true,
      secure: process.env.VERCEL_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 14,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);

    res.status(200).json("Logged In");
  } catch (e) {
    res.status(401).json({ message: "Wrong Email" });
  }
}

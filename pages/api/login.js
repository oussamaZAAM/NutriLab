import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import nextCookies from "next-cookies";
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
    // const refreshPayload = { user: user, jti: uuidv4() };
    const token = jwt.sign(user, process.env.JWT_SECRET);
    console.log(token);
    const serialised = serialize("NutriLab", token, {
      httpOnly: true,
      secure: process.env.MODE_ENV !== "dev",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);

    res.status(200).json(token);
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log("Email already registered");
        res.json({ error: "Email already registered" });
      } else {
        res.json(e);
      }
    }
  }
}

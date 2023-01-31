import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
export default async function register(req, res) {
  const user = req.body;
  console.log(user);
  const SALT_ROUNDS = 12;
  const pass = await bcrypt.hash(user.password, SALT_ROUNDS);
  console.log(pass);
  try {
    const result = await prisma.User.create({
      data: {
        name: user.name,
        email: user.email,
        password: pass,
      },
    });
    await prisma.NutriInfo.create({
      data: {
        userId: result.id,
      },
    });
    await prisma.Nutrients.create({
      data: {
        userId: result.id,
      },
    });
    const token = jwt.sign(result, process.env.JWT_SECRET);
    const serialised = serialize("NutriLab", token, {
      httpOnly: true,
      secure: process.env.MODE_ENV !== "dev",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.json(token);
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

import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
export default async function register(req, res) {
  const user = req.body;
  const SALT_ROUNDS = parseInt(process.env.SALT);
  const pass = await bcrypt.hash(user.password, SALT_ROUNDS);
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

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET);
    const serialised = serialize("NutriLab", token, {
      httpOnly: true,
      secure: process.env.VERCEL_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.json("Well Registered");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        res.status(401).json({ error: "Email already registered" });
      } else {
        res.json(e);
      }
    }
  }
}

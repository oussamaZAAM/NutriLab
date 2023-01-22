import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export default async function register(req, res) {
  const user = req.body;
  console.log(user);
  try {
    const result = await prisma.User.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    res.json(result);
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

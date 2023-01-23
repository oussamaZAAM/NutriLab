import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export default async function login(req, res) {
  const user = req.body;
  console.log(user);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    console.log("user");
    res.json(user);
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

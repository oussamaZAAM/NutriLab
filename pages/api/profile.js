import prisma from "./prisma";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./auth/[...nextauth]";
export default async function profile(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    const data = req.body;
    if (session) {
      data.userId = session.user.id;
    } else {
      const { cookies } = req;
      const token = cookies.NutriLab;
      const userr = jwt.verify(token, process.env.JWT_SECRET);
      data.userId = userr.id;
    }
    try {
      const user = await prisma.NutriInfo.upsert({
        where: {
          userId: data.userId,
        },
        update: data,
        create: data,
      });

      res.status(200).json(user);
    } catch (e) {
      res.status(401).json({ message: "Wrong Info" });
    }
  }
  if (req.method === "GET") {
    const { cookies } = req;
    const token = cookies.NutriLab;
    const userr = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const user = await prisma.NutriInfo.findUnique({
        where: {
          userId: userr.id,
        },
      });
      res.status(200).json(user);
    } catch (e) {
      res.status(401).json({ message: "No Nutri Info" });
    }
  }
}

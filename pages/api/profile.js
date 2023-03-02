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
      data.userId = req.headers.userid;
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
    try {
      const nutriInfo = await prisma.NutriInfo.findUnique({
        where: {
          userId: req.headers.userid,
        },
      });
      res.status(200).json(nutriInfo);
    } catch (e) {
      res.status(401).json({ message: "No Nutri Info" });
    }
  }
}

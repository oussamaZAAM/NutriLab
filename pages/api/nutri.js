import prisma from "./prisma";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function nutrients(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    const data = req.body;
    // const { cookies } = req;
    // const token = cookies.NutriLab;
    // console.log(data);
    // const userr = jwt.verify(token, process.env.JWT_SECRET);
    data.userId = session.user.id;

    try {
      const user = await prisma.Nutrients.upsert({
        where: {
          userId: data.userId,
        },
        update: data,
        create: data,
      });

      console.log(user);
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
      const user = await prisma.Nutrients.findUnique({
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

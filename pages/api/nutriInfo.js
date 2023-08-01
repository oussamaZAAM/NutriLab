import prisma from "./prisma";

import { authOptions } from "./auth/[...nextauth]";
export default async function profile(req, res) {
  if (req.method === "PUT") {
    const data = req.body;

    data.userId = req.headers.userid;

    try {
      const nutriInfos = await prisma.NutriInfo.upsert({
        where: {
          userId: data.userId,
        },
        update: data,
        create: data,
      });

      const userData = { ...data };
      delete userData.userId;

      await prisma.User.upsert({
        where: {
          id: nutriInfos.userId,
        },
        update: userData,
        create: userData,
      });

      res.status(200).json(nutriInfos);
    } catch (e) {
      res.status(401).json({ message: "Wrong Info" });
    }
  }
  if (req.method === "GET") {
    let userid;

    userid = req.headers.userid;

    try {
      const nutriInfo = await prisma.NutriInfo.findUnique({
        where: {
          userId: userid,
        },
      });
      delete nutriInfo.id;
      res.status(200).json(nutriInfo);
    } catch (e) {
      res.status(401).json({ message: "No Nutri Info" });
    }
  }
}

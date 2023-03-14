import prisma from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function food(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    let data = req.body;
    if (session) {
      data.userId = session.user.id;
    } else {
      data.userId = req.headers.userid;
    }
    try {
      const foodList = await prisma.FoodList.create({
        data: {
          userId: data.userId,
        },
      });

      data = data.map((prevObj) => {
        return {
          name: prevObj.name,
          size: parseFloat(prevObj.size),
          foodListId: foodList.id,
        };
      });
      const uus = await prisma.Food.createMany({
        data: data,
      });

      res.status(200).json(uus);
    } catch (e) {
      res.status(401).json({ message: "Wrong Info" });
    }
  }
  if (req.method === "GET") {
    let userid;
    if (session) {
      userid = session.user.id;
    } else {
      userid = req.headers.userid;
    }
    try {
      const user = await prisma.FoodList.findMany({
        include: {
          food: true,
        },
        where: {
          AND: {
            userId: userid,
            // date: '2023-03-14T18:17:52.319Z'
          }
        },
      });
      res.status(200).json(user);
    } catch (e) {
      res.status(401).json({ message: "No Food list" });
    }
  }
}

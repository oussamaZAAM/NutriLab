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
      let input = {
        userId: data.userId,
        Calories: data.Calories,
        Carbs: data.Carbs,
        Fat: data.Fat,
        Fiber: data.Fiber,
        Protein: data.Protein,
        Salt: data.Salt,
        Sugar: data.Sugar,
      };
      const foodList = await prisma.FoodList.create({
        data: input,
      });

      data = data.eatenFoodList.map((prevObj) => {
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
      console.log(e)
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
      let user;
      if (req.query.specifyDate) {
        user = await prisma.FoodList.findMany({
          include: {
            food: true,
          },
          where: {
            AND: {
              userId: userid,
              date: req.query.date
            }
          },
        });
      } else {
        user = await prisma.FoodList.findMany({
          include: {
            food: true,
          },
          where: {
            userId: userid
          },
        });
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(401).json({ message: "No Food list" });
    }
  }
}

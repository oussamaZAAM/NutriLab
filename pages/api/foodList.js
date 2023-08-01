import prisma from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function food(req, res) {
  if (req.method === "POST") {
    let data = req.body;

    data.userId = req.headers.userid;

    try {
      let input = {
        userId: data.userId,
        kCalories: data.Calories,
        carbs: data.Carbs,
        fats: data.Fat,
        fiber: data.Fiber,
        proteins: data.Protein,
        salt: data.Salt,
        sugar: data.Sugar,
      };
      const date = new Date();
      const latestFoodList = await prisma.FoodList.findMany({
        where: {
          userId: data.userId,
        },
        orderBy: {
          date: "desc",
        },
        take: 1,
      });
      if (
        latestFoodList[0] &&
        parseInt(date.getDate()) - parseInt(latestFoodList[0].date.getDate()) <
          1
      ) {
        const deletedFoodList = await prisma.FoodList.delete({
          where: {
            id: latestFoodList[0].id,
          },
        });
      }
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
      console.log(e);
      res.status(401).json({ message: "Wrong Info" });
    }
  }
  if (req.method === "GET") {
    let userid;

    userid = req.headers.userid;

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
              date: req.query.date,
            },
          },
        });
      } else {
        user = await prisma.FoodList.findMany({
          include: {
            food: true,
          },
          where: {
            userId: userid,
          },
        });
      }
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "No Food list" });
    }
  }
}

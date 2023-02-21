import prisma from "./prisma";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default async function profile(req, res) {
  if (req.method === "PUT") {
    const data = req.body;
    const { cookies } = req;
    const token = cookies.NutriLab;
    const userr = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const user = await prisma.NutriInfo.update({
        where: {
          userId: userr.id,
        },
        data: {
          age: data.age,
          sex: data.sex,
          height: data.height,
          weight: data.weight,
          activity: data.activity,
          plan: data.plan, //Plan attribute not known by prisma even after migration ?
        },
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

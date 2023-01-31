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
        data: data,
      });

      // const token = jwt.sign(user, process.env.JWT_SECRET);
      // console.log(token);
      // const serialised = serialize("NutriLab", token, {
      //   httpOnly: true,
      //   secure: process.env.MODE_ENV !== "dev",
      //   sameSite: "strict",
      //   maxAge: 60 * 60,
      //   path: "/",
      // });
      // res.setHeader("Set-Cookie", serialised);
      res.status(200).json(user);
    } catch (e) {
      res.status(401).json({ message: "Wrong Email" });
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

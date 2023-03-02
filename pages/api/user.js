import prisma from "./prisma";
import jwt from "jsonwebtoken";

export default async function user(req, res) {
  const { cookies } = req;
  const token = cookies.NutriLab;
  if (token === undefined) {
    res.status(200).json(null);
  } else {
    const userr = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const user = await prisma.User.findUnique({
        where: {
          id: userr.id,
        },
      });
      res.status(200).json(user);
    } catch (e) {
      res.status(404).json({ message: "No User Info" });
    }
  }
}

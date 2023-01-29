import prisma from "./prisma";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default async function profile(req, res) {
  const data = req.body;
  const { cookies } = req;
  const token = cookies.NutriLab;
  console.log(data);
  const userr = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await prisma.User.update({
      where: {
        email: userr.email,
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
    console.log(user);
    res.status(200).json(user);
  } catch (e) {
    res.status(401).json({ message: "Wrong Email" });
  }
}

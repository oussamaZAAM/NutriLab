import prisma from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function login(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (session) {
    return res.status(200).json(session.user.name);
  }

  res.status(401).json({ message: "Wrong!!" });
}

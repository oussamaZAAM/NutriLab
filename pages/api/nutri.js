import prisma from "./prisma";

export default async function nutrients(req, res) {
  if (req.method === "PUT") {
    const data = req.body;

    data.userId = req.headers.userid;

    try {
      const user = await prisma.Nutrients.upsert({
        where: {
          userId: data.userId,
        },
        update: data,
        create: data,
      });

      res.status(200).json(user);
    } catch (e) {
      res.status(401).json({ message: "Wrong Info" });
    }
  }
  if (req.method === "GET") {
    let userid;

    userid = req.headers.userid;

    try {
      const user = await prisma.Nutrients.findUnique({
        where: {
          userId: userid,
        },
      });
      res.status(200).json(user);
    } catch (e) {
      res.status(401).json({ message: "No Nutri Info" });
    }
  }
}

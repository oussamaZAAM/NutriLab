import prisma from "./prisma";

export default async function user(req, res) {
  try {
    const user = await prisma.User.findUnique({
      where: {
        id: req.headers.userid,
      },
    });
    res.status(200).json({ id: user.id });
  } catch (e) {
    res.status(404).json({ message: "No User Info" });
    // }
  }
}

import prisma from "./prisma";

export default async function registerProvider(req, res) {
  const registeredUser = await prisma.User.findUnique({
    where: {
      email: req.body.email,
    },
    include: {
      NutriInfo: true,
    },
  });
  if (!registeredUser.NutriInfo) {
    await prisma.NutriInfo.create({
      data: {
        userId: registeredUser.id,
      },
    });
    await prisma.Nutrients.create({
      data: {
        userId: registeredUser.id,
      },
    });
    res.status(200).json({ error: "Done Registering" });
  }
  res.status(401).json({ error: "Email already registered" });
}

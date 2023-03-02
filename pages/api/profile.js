import prisma from "./prisma";
export default async function profile(req, res) {

  if (req.method === "GET") {
    try {
      const profile = await prisma.User.findUnique({
        where: {
          id: req.headers.userid,
        },
      });

      delete profile.emailVerified;
      delete profile.password;
      
      res.status(200).json(profile);
    } catch (e) {
      res.status(401).json({ message: "No User Found" });
    }
  }
}

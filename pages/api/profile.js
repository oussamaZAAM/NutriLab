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

  if (req.method === "PUT") {
    if (req.body.type === 'profile'){
      try{
        const checkUser = await prisma.User.findUnique({
          where: {
            id: req.headers.userid,
          }
        })
        if (!checkUser) return res.status(404).json({message: 'No User found'})
        // Tests on the email's redundance
        const checkEmail = await prisma.User.findUnique({
          where: {
            email: req.body.data.email,
          }
        })
        if ((checkUser.email !== req.body.data.email) && checkEmail) return res.status(404).json({message: 'Email exists already'});
        
        // Update the user profile
        const user = await prisma.User.upsert({
          where: {
            id: req.headers.userid,
          },
          update: req.body.data,
          create: req.body.data
        })
        
        if (!user) return res.status(404).json({message: 'No User found'});
        res.status(200).json({message: 'Profile updated successfully'});
      } catch (e) {
        res.status(401).json({ message: "No User Found" });
      }
    }
  }
}

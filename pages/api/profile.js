import prisma from "./prisma";
import bcrypt from "bcrypt";

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
    // Update Profile Data(email, username)
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
        res.status(500).json({ message: "Server Error" });
      }
    }

    // Update Diet Informations(age, sex, height, ...)
    if (req.body.type === 'diet'){
      try{
        const checkUser = await prisma.User.findUnique({
          where: {
            id: req.headers.userid,
          }
        })
        if (!checkUser) return res.status(404).json({message: 'No User found'})
        
        // Update the user diet
        const user = await prisma.User.upsert({
          where: {
            id: req.headers.userid,
          },
          update: req.body.data,
          create: req.body.data
        })
        
        if (!user) return res.status(404).json({message: 'No User found'});
        res.status(200).json({message: 'Diet informations updated successfully'});
      } catch (e) {
        res.status(500).json({ message: "Server Error" });
      }
    }

    // Update User's Password
    if (req.body.type === 'password'){
      try{
        const checkUser = await prisma.User.findUnique({
          where: {
            id: req.headers.userid,
          }
        })
        if (!checkUser) return res.status(404).json({message: 'No User found'})
        
        // Check if the password typed is correct
        const isValid = await bcrypt.compare(req.body.data.oldPassword, checkUser.password);
        if (!isValid) return res.status(401).json({ message: "Invalid password" });

        // Hash the new Password
        const SALT_ROUNDS = parseInt(process.env.SALT);
        const hashedPassword = await bcrypt.hash(req.body.data.newPassword, SALT_ROUNDS);
        
        // Update the user password
        const user = await prisma.User.upsert({
          where: {
            id: req.headers.userid,
          },
          update: {password: hashedPassword},
          create: {password: hashedPassword}
        })
        if (!user) return res.status(404).json({message: 'No User found'});
        res.status(200).json({message: 'Pasword updated successfully'});
      } catch (e) {
        res.status(500).json({ message: "Server Error" });
      }
    }
  }
}

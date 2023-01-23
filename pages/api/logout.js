import { serialize } from "cookie";

function logout(req, res) {
  console.log("ayou");
  const { cookies } = req;
  const jwt = cookies.NutriLab;
  !jwt && res.json({ message: "Already logged out" });
  const serialised = serialize("NutriLab", null, {
    httpOnly: true,
    secure: process.env.MODE_ENV !== "dev",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialised);
  res.json({ message: "Logged out" });
}

export default logout;

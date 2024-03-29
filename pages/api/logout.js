import { serialize } from "cookie";

function logout(req, res) {
  const { cookies } = req;
  const jwt = cookies.NutriLab;
  !jwt && res.json({ message: "Already logged out" });
  const serialised = serialize("NutriLab", null, {
    httpOnly: true,
    secure: process.env.VERCEL_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialised);
  res.json({ message: "Logged out" });
}

export default logout;

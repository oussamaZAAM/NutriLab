import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export async function sign(payload, secret) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token, secret) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
}

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let cookie = request.cookies.get("NutriLab")?.value;
  const userr = verify(cookie, process.env.JWT_SECRET);
  console.log(userr);
  return new NextResponse(
    JSON.stringify({ success: false, message: "authentication failed" }),
    { status: 401, headers: { "content-type": "application/json" } }
  );
  // return NextResponse.redirect(new URL("/about-2", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/nutri",
};

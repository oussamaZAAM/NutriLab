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
export async function middleware(request) {
  let cookie = request.cookies.get("NutriLab")?.value;
  if (cookie) {
    const user = await verify(cookie, process.env.JWT_SECRET);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", user.id);
    return (
      (user) &&
      NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    );
  } else {
    return NextResponse.redirect(new URL("/?requestLogin=1", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile",
    "/foodProcess",
    "/api/profile",
    "/api/nutriInfo",
    "/api/nutri",
    "/api/user",
    "/api/foodList",
  ],
};

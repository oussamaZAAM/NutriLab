import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { decode } from "next-auth/jwt";
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
  if (request.cookies.get("next-auth.session-token")?.value) {
    const decoded = await decode({
      token: request.cookies.get("next-auth.session-token")?.value,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", decoded.uid);
    return (
      decoded &&
      NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    );
  }
  let cookie = request.cookies.get("NutriLab")?.value;
  if (cookie) {
    const user = await verify(cookie, process.env.JWT_SECRET);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", user.id);
    return (
      user &&
      NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    );
  } else {
    const path = request.nextUrl.pathname;
    return NextResponse.redirect(
      new URL("/?path=" + path + "&requestLogin=1", request.url)
    );
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

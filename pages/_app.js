import "/styles/globals.css";
import Context from "../context/context";
import React, { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <SessionProvider session={session}>
      <Context currentUser={user}>
        <Component {...pageProps} />
      </Context>
    </SessionProvider>
  );
}

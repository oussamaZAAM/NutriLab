import "/styles/globals.css";
import Context from "../context/context";
import React, { useState, useEffect } from "react";
export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <Context currentUser={user}>
      <Component {...pageProps} />
    </Context>
  );
}

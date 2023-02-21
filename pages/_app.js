import "/styles/globals.css";
import Context from "../context/context";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Context>
        <Component {...pageProps} />
      </Context>
    </SessionProvider>
  );
}

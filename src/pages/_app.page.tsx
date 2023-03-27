import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { globalStyles } from "./styles/global";
import { HeaderPage } from "./components/HeaderPage";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;

  let headerComponent;
  if (session) {
    headerComponent = <HeaderPage session={session} />;
  } else {
    headerComponent = <HeaderPage />;
  }

  return (
    <SessionProvider session={session}>
      {headerComponent}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

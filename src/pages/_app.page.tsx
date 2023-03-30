import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { globalStyles } from "./styles/global";
import { HeaderPage } from "./components/HeaderPage";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <HeaderPage session={session} /> 
      <Component {...pageProps} />
    </SessionProvider>
  );
}

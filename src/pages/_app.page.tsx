import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { globalStyles } from './styles/global'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <Component {...pageProps} />

      
    </SessionProvider>
  )
}
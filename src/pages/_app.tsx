import "@/styles/bootstrap.scss"
import "@/styles/globals.css"
if (typeof window !== 'undefined') {
  require("bootstrap")
}
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Navbar from "@/components/Navbar"
import LayoutDefault from "@/layouts/default"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => {
    return (
      <SessionProvider session={session}>
        <LayoutDefault>{page}</LayoutDefault>
      </SessionProvider>)
  })

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

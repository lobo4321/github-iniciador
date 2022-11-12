import type { AppProps } from 'next/app'
import { Header } from '../components'
import { QueryClientProvider, QueryClient } from 'react-query'
import { SessionProvider } from 'next-auth/react'

import '../styles/global.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

import type { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/clerk-react'
import '@/styles/globals.css'

const frontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API

if (!frontendApi) {
  throw new Error('Missing Clerk Frontend API')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider frontendApi={frontendApi as string}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

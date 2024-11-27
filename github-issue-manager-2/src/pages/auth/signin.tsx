import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SignIn, useAuth } from '@clerk/clerk-react'
import { Loader2 } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/issues')
    }
  }, [isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'rounded-lg shadow-lg',
          },
        }}
      />
    </div>
  )
}

export function getStaticProps() {
  return {
    props: {},
  }
}

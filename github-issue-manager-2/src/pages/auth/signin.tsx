import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

interface SignInProps {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to GitHub Issue Manager
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your GitHub account to continue
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className="w-full"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Sign in with {provider.name}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

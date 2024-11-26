declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    NEXT_PUBLIC_GITHUB_DEFAULT_ORG?: string
    NEXT_PUBLIC_GITHUB_DEFAULT_REPO?: string
  }
}

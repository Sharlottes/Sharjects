declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NEXT AUTH
      NEXTAUTH_AUTH_SECRET: string,
      JWT_SECRET: string,

      GOOGLE_ID: string,
      GOOGLE_SECRET: string,
      GITHUB_ID: string,
      GITHUB_SECRET: string,
      DISCORD_ID: string,
      DISCORD_SECRET: string,

      // MONGO DB
      MONGODB_URI: string,

      // GITHUB REST
      NEXT_PUBLIC_GITHUB_REST_PAT: string,

      // GOOGLE ANALYTICS
      GOOGLE_ANALYTICS_ID: string
    }
  }
  interface Window {
    // GOOGLE TAG
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

declare module 'notistack' {
  interface VariantOverrides {
    lifebar: true
  }
}

export type listAnimatonRefType = {
  list: Array<(delay: number) => void>
}

export type projectDataType = {
  owner: string,
  projects: Array<{
    name: string,
    description: string,
    tags: tagType[],
    link?: string
  }>
}

export { }
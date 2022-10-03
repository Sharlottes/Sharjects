declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXTAUTH_AUTH_SECRET: string
            JWT_SECRET: string,
            MONGODB_URI: string,
            GITHUB_REST_PAT: string
        }
    }
}

export {}
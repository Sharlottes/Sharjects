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
            GITHUB_REST_PAT: string,

            // GOOGLE ANALYTICS
            GOOGLE_ANALYTICS_ID: string
        }
    }
    interface Window {
        gtag: (param1: string, param2: string, param3: object) => void;
    }
}

export {}
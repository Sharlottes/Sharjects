export interface Envs {
  // NEXT AUTH
  NEXTAUTH_AUTH_SECRET: string;
  JWT_SECRET: string;

  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  DISCORD_ID: string;
  DISCORD_SECRET: string;

  // MONGO DB
  MONGODB_URI: string;

  // GITHUB REST
  GITHUB_REST_PAT: string;

  // GOOGLE ANALYTICS
  GOOGLE_ANALYTICS_ID: string;

  // Naver API Headers
  XNaverClientId: string;
  XNaverClientSecret: string;

  // Spotify API
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
}

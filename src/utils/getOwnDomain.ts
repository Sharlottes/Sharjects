export const getOwnDomain = () =>
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://sharjects-sharlottes.vercel.app/";

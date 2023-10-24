import type { Envs } from "./envs";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Envs {}
  }
  interface Window {
    // GOOGLE TAG
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: any;
  }
}

declare module "notistack" {
  interface VariantOverrides {
    lifebar: true;
  }
}

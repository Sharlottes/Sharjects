import { Envs } from "./envs";

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

declare global {
  interface CustomPalette {
    themedBlack: string;
    themedWhite: string;
    text: {
      primary: string;
      secondary: string;
    };
    github: {
      backgroundColor: string;
      linkColor: string;
      borderColor: string;
      iconColor: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends Partial<CustomPalette> {}
}

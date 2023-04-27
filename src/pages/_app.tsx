import Head from "next/head";

import type { Session } from "next-auth/core/types";
import type { AppProps as NextAppProps } from "next/app";

import { CacheProvider, type EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

import CssBaseline from "@mui/material/CssBaseline";

import useAnalyticTracker from "src/hooks/useAnalyticTracker";
import { LifebarSnackbar, AuthWrapper } from "src/components/pages/_app";

import "public/styles/global.css";
import MainThemeProvider from "src/components/MainThemeProvider";
import { SWRConfig } from "swr";
import Providers from "./Providers";

require("src/lib/registerChartjs");

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
  Component: CustomNextPage;
  pageProps: Record<string, any> & {
    session: Session | null;
  };
}

const App: React.FC<AppProps> = ({
  Component,
  emotionCache = createCache({ key: "css", prepend: true }),
  pageProps: { session, ...pageProps },
}) => {
  useAnalyticTracker();

  return (
    <>
      <Head>
        <title>Sharlotte's Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers
        emotionCache={emotionCache}
        session={session}
        auth={Component.auth}
      >
        <Component {...pageProps} />
      </Providers>
    </>
  );
};

export default App;

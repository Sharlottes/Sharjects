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

require("src/lib/registerChartjs");

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
  Component: CustomNextPage;
  pageProps: Record<string, any> & {
    session: Session | null;
  };
}

const App: React.FC<AppProps> = ({
  emotionCache = createCache({ key: "css", prepend: true }),
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useAnalyticTracker();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Sharlotte's Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MainThemeProvider>
        <CssBaseline />
        <SessionProvider session={session}>
          <SnackbarProvider
            maxSnack={3}
            Components={{ lifebar: LifebarSnackbar }}
          >
            <SWRConfig
              value={{
                refreshInterval: 3000,
                fetcher: (resource, init) =>
                  fetch(resource, init).then((res) => res.json()),
              }}
            >
              <AuthWrapper auth={Component.auth}>
                <Component {...pageProps} />
              </AuthWrapper>
            </SWRConfig>
          </SnackbarProvider>
        </SessionProvider>
      </MainThemeProvider>
    </CacheProvider>
  );
};

export default App;

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
import GithubStaticDataContext from "src/components/GithubStaticDataContext";
import MainThemeProvider from "src/components/MainThemeProvider";

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
            <AuthWrapper auth={Component.auth} muteAlert={Component.muteAlert}>
              <GithubStaticDataContext>
                <Component {...pageProps} />
              </GithubStaticDataContext>
            </AuthWrapper>
          </SnackbarProvider>
        </SessionProvider>
      </MainThemeProvider>
    </CacheProvider>
  );
};

export default App;

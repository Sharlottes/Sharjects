import React from "react";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";

import { CacheProvider, type EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

import CssBaseline from "@mui/material/CssBaseline";

import GithubStaticDataContext from "src/components/GithubStaticDataContext";
import MainThemeProvider from "src/components/MainThemeProvider";
import LifebarSnackbar from "src/components/LifebarSnackbar";
import AuthWrapper from "src/components/AuthWrapper";
import useAnalyticTracker from "src/hooks/useAnalyticTracker";

import "public/styles/global.css";

import type { Session } from "next-auth/core/types";
import { AnimatePresence } from "framer-motion";

// for chart.js rendering
require("src/lib/registerChartjs");

export type CustomNextPage<P = {}, IP = P, C = NextPage<P, IP>> = C & {
  auth?: any;
  notPage?: boolean;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: CustomNextPage;
  pageProps: {
    session: Session | null;
    [_: string]: any;
  };
}

const MyApp: React.FC<MyAppProps> = ({
  emotionCache = createCache({ key: "css", prepend: true }),
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useAnalyticTracker(useRouter());
  React.useEffect(() => {
    if (Component.notPage) router.replace("/404");
  }, []);
  if (Component.notPage) return <></>;

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
            <AuthWrapper auth={Component.auth}>
              <GithubStaticDataContext>
                <AnimatePresence>
                  <Component {...pageProps} />
                </AnimatePresence>
              </GithubStaticDataContext>
            </AuthWrapper>
          </SnackbarProvider>
        </SessionProvider>
      </MainThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

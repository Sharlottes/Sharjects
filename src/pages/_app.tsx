import React from 'react';
import { SessionProvider, useSession } from "next-auth/react"
import Head from 'next/head'

import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'src/pages/theme';
import createEmotionCache from 'src/pages/createEmotionCache';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import connectdb from '../lib/connectDB'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'assets/fonts/UniSans.css';
import 'assets/styles/global.css';

import type { AppProps } from 'next/app';
import type { EmotionCache } from '@emotion/react';
import type { NextComponentType, NextPageContext } from 'next';

// connect to mongo db
connectdb()

// Create a client
const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type BaseComponentType<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & { auth?: any };

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: BaseComponentType<any, {}>;
}

const MyApp: React.FC<MyAppProps> = (
  {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>React App</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SessionProvider session={session}>
            <SnackbarProvider maxSnack={1}>
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </SnackbarProvider>
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

export default MyApp;
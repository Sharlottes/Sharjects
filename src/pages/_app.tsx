import React from 'react';
import Head from 'next/head'
import type { AppProps } from 'next/app';
import type { NextPage } from 'next'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { SessionProvider, useSession } from "next-auth/react"
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'

import theme from 'src/theme'
import createEmotionCache from 'src/createEmotionCache'
import AnalyticTracker from 'src/components/hoc/AnalyticTracker'

import 'public/fonts/UniSans.css'
import 'public/styles/global.css'
import { } from "src/@type";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type AuthNextPage<P = {}, IP = P> = NextPage<P, IP> & { auth?: any };

const MyApp: React.FC<{
  emotionCache?: EmotionCache;
  Component: AuthNextPage<any, {}>;
  pageProps: any;
} & AppProps<{ session: any }>> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) => { 
    AnalyticTracker();
    return (
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
    )
}

const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

export default MyApp;
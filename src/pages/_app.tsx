import React from 'react';
import Head from 'next/head'
import type { AppProps } from 'next/app';
import type { NextPage } from 'next'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { SessionProvider, useSession } from "next-auth/react"
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'

import MainThemeProvider from 'src/components/MainThemeProvider'
import createEmotionCache from 'src/createEmotionCache'
import AnalyticTracker from 'src/components/hoc/AnalyticTracker'

import 'public/fonts/UniSans.css'
import 'public/styles/global.css'
import { } from "src/@type";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// for chart.js rendering
require('src/lib/registerChartjs');

export type AuthNextPage<P = {}, IP = P> = NextPage<P, IP> & { auth?: any };

const MyApp: React.FC<{
  emotionCache?: EmotionCache;
  Component: AuthNextPage;
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
        <MainThemeProvider>
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
        </MainThemeProvider>
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
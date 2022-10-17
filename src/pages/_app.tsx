import React from 'react';
import Head from 'next/head'
import type { AppProps } from 'next/app';
import type { NextPage } from 'next'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { SessionProvider } from "next-auth/react"
import { SnackbarProvider } from 'notistack'

import CssBaseline from '@mui/material/CssBaseline'

import AuthWrapper from 'src/components/AuthWrapper'
import createEmotionCache from 'src/createEmotionCache'
import MainThemeProvider from 'src/components/MainThemeProvider'
import AnalyticTracker from 'src/components/hoc/AnalyticTracker'

import 'public/fonts/UniSans.css'
import 'public/styles/global.css'
import { } from "src/@type";

// for chart.js rendering
require('src/lib/registerChartjs');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

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
          <title>Sharlotte's Portfolio</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <MainThemeProvider>
          <CssBaseline />
          <SessionProvider session={session}>
            <SnackbarProvider maxSnack={3}>
              <AuthWrapper auth={Component.auth}>
                <Component {...pageProps} />
              </AuthWrapper>
            </SnackbarProvider>
          </SessionProvider>
        </MainThemeProvider>
      </CacheProvider>
    )
  }


export default MyApp;
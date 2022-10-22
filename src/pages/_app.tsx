import React from 'react';
import Head from 'next/head'
import type { AppProps } from 'next/app';
import type { NextPage } from 'next'

import { CacheProvider, type EmotionCache } from '@emotion/react'
import createCache from '@emotion/cache';

import { SessionProvider } from "next-auth/react"
import { SnackbarProvider } from 'notistack'

import CssBaseline from '@mui/material/CssBaseline'

import MainThemeProvider from 'src/components/MainThemeProvider'
import AnalyticTracker from 'src/components/hoc/AnalyticTracker'
import LifebarSnackbar from 'src/components/LifebarSnackbar'
import AuthWrapper from 'src/components/AuthWrapper'

import 'public/fonts/UniSans.css'
import 'public/styles/global.css'
import { } from "src/@type";

// for chart.js rendering
require('src/lib/registerChartjs');


export type AuthNextPage<P = {}, IP = P> = NextPage<P, IP> & { auth?: any };

const MyApp: React.FC<{
  emotionCache?: EmotionCache;
  Component: AuthNextPage;
  pageProps: any;
} & AppProps<{ session: any }>> = ({
  Component,
  emotionCache = createCache({ key: 'css', prepend: true }),
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
            <SnackbarProvider maxSnack={3} Components={{ lifebar: LifebarSnackbar }}>
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
import React from 'react';
import Head from 'next/head'
import Script from 'next/script'
import type { AppProps } from 'next/app';
import type { NextPage } from 'next'

import { SessionProvider, useSession } from "next-auth/react"

import theme from 'src/theme'
import createEmotionCache from 'src/createEmotionCache'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { SnackbarProvider } from 'notistack'

import 'public/fonts/UniSans.css'
import 'public/styles/global.css'
import { } from "src/@type";
import { useRouter } from 'next/router';
import * as ga from 'src/lib/ga';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type AuthNextPage<P = {}, IP = P> = NextPage<P, IP> & { auth?: any };
interface MyAppProps extends Omit<AppProps, 'pageProps'> {
  emotionCache?: EmotionCache;
  Component: AuthNextPage<any, {}>;
  pageProps: any;
}

const MyApp: React.FC<MyAppProps> = (
  {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  }) => { 
    const router = useRouter();
  
    React.useEffect(() => {
      const handleRouteChange: 
        (...evt: any) => void = 
        url => ga.pageview(url);
      router.events.on('routeChangeComplete', handleRouteChange);
  
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);
  return (<>
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
    </>)
}

const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

export default MyApp;
import React from 'react';
import Head from 'next/head'
  ;
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import type { EmotionCache } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'src/client/pages/theme';
import createEmotionCache from 'src/client/pages/createEmotionCache';

import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { SessionProvider } from "next-auth/react"
import UserContextProvider from 'components/providers/UserContextProvider';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'assets/fonts/UniSans.css';
import 'assets/styles/global.css';

// Create a client
const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
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
            <UserContextProvider>
              <SnackbarProvider maxSnack={1}>
                <Component {...pageProps} />
              </SnackbarProvider>
            </UserContextProvider>
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
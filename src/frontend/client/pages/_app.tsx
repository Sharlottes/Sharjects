import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from 'src/frontend/client/pages/theme'
import createEmotionCache from 'src/frontend/client/pages/createEmotionCache'
import { SnackbarProvider } from 'notistack'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'assets/fonts/UniSans.css'
import 'assets/styles/global.css'
import UserContextProvider from 'components/providers/UserContextProvider'
import { CookiesProvider } from 'react-cookie'

// Create a client
const queryClient = new QueryClient()

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: React.FC<MyAppProps> = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

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
          <UserContextProvider>
            <SnackbarProvider maxSnack={2}>
              <CookiesProvider>
                <Component {...pageProps} />
              </CookiesProvider>
            </SnackbarProvider>
          </UserContextProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}

export default MyApp
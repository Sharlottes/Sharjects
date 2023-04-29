import type { AppProps as NextAppProps } from "next/app";
import type { Session } from "next-auth/core/types";
import type { EmotionCache } from "@emotion/react";

import Head from "next/head";
import createCache from "@emotion/cache";
import Providers from "src/components/providers/Providers";
import useAnalyticTracker from "src/hooks/useAnalyticTracker";

import "public/styles/global.css";
require("src/lib/registerChartjs");

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
  Component: CustomNextPage;
  pageProps: Record<string, any> & {
    session: Session | null;
  };
}

const App: React.FC<AppProps> = ({
  Component,
  emotionCache = createCache({ key: "css", prepend: true }),
  pageProps: { session, ...pageProps },
}) => {
  useAnalyticTracker();

  return (
    <>
      <Head>
        <title>Sharlotte's Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers
        emotionCache={emotionCache}
        session={session}
        auth={Component.auth}
      >
        <Component {...pageProps} />
      </Providers>
    </>
  );
};

export default App;

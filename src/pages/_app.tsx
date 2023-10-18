import type { AppProps as NextAppProps } from "next/app";
import type { Session } from "next-auth/core/types";
import type { EmotionCache } from "@emotion/react";

import Head from "next/head";
import createCache from "@emotion/cache";
import Providers from "src/components/providers/Providers";
import useAnalyticTracker from "src/hooks/useAnalyticTracker";
import localFont from "next/font/local";
import { Nanum_Pen_Script } from "next/font/google";
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});
const nanumPenScript = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
});

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
      <style jsx global>{`
        :root {
          --font-pretendard: ${pretendard.style.fontFamily};
          --font-nanum-pen-script: ${nanumPenScript.style.fontFamily};
        }
        * {
          font-family: var(--font-pretendard);
        }
      `}</style>
      <Head>
        <title>Sharlotte's Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="the first portfolio website based on Next.js, published on Vercel."
        />
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

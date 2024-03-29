import { CacheProvider, type EmotionCache } from "@emotion/react";
import MainThemeProvider from "./MainThemeProvider";
import useAnalyticTracker from "src/hooks/useAnalyticTracker";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { SWRConfig } from "swr";

import type { Session } from "next-auth";
import AuthWrapper from "./AuthWrapper";
import LifebarSnackbar from "./LifebarSnackbar";

interface ProvidersProps extends React.PropsWithChildren {
  emotionCache: EmotionCache;
  session: Session | null;
  auth: any;
}

function Providers({ emotionCache, session, auth, children }: ProvidersProps) {
  useAnalyticTracker();
  return (
    <CacheProvider value={emotionCache}>
      <MainThemeProvider>
        <SessionProvider session={session}>
          <SnackbarProvider
            maxSnack={3}
            Components={{ lifebar: LifebarSnackbar }}
          >
            <SWRConfig
              value={{
                fetcher: (resource, init) =>
                  fetch(resource, init).then(
                    (res) => {
                      if (res.status >= 400) console.error(res);
                      else return res.json();
                    },
                    (err) => {
                      console.error(err);
                      return undefined;
                    }
                  ),
              }}
            >
              <AuthWrapper auth={auth}>{children}</AuthWrapper>
            </SWRConfig>
          </SnackbarProvider>
        </SessionProvider>
      </MainThemeProvider>
    </CacheProvider>
  );
}

export default Providers;

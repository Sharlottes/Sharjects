import { LifebarSnackbar, AuthWrapper } from "src/components/pages/_app";
import { CacheProvider, type EmotionCache } from "@emotion/react";
import MainThemeProvider from "src/components/MainThemeProvider";
import useAnalyticTracker from "src/hooks/useAnalyticTracker";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { SWRConfig } from "swr";

import type { Session } from "next-auth";

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
        <CssBaseline />
        <SessionProvider session={session}>
          <SnackbarProvider
            maxSnack={3}
            Components={{ lifebar: LifebarSnackbar }}
          >
            <SWRConfig
              value={{
                refreshInterval: 3000,
                fetcher: (resource, init) =>
                  fetch(resource, init).then((res) => res.json()),
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
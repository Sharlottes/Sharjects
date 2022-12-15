import React from 'react';
import { type NextRouter } from 'next/router';
import { pageview } from 'src/lib/ga';

const useAnalyticTracker = (router: NextRouter) => {
  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageview(url);
      fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "this is just for": "enabling post method"
        })
      });
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return router;
}

export default useAnalyticTracker;
import React from 'react';
import { useRouter } from 'next/router';
import * as ga from 'src/lib/ga';

const AnalyticTracker = () => {
    const router = useRouter();
  
    React.useEffect(() => {
      const handleRouteChange = (url: any) => {
        ga.pageview(url);
        fetch('/api/visit', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        });
      }
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);
}

export default AnalyticTracker;
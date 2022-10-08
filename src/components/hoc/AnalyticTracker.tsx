import React from 'react';
import { useRouter } from 'next/router';
import * as ga from 'src/lib/ga';

const AnalyticTracker = () => {
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
}

export default AnalyticTracker;
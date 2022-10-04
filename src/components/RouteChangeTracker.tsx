import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'
import initAnalytics from 'src/lib/initAnalytics';

const RouteChangeTracter = () => {
    const router = useRouter();
    const [inited, setInited] = useState(false);
    
    useEffect(() => {
        if(!window.location.href.includes('localhost')) initAnalytics();
        setInited(true);
    }, []);

    useEffect(() => {
        ReactGA.pageview(router.asPath);
    }, [inited, router.asPath])
}

export default RouteChangeTracter
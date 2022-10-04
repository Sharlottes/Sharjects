import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'

const RouteChangeTracter = () => {
    const router = useRouter()

    useEffect(() => {
        ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
        const handleRouteChange: (...evts: any[]) => void = (url, { shallow }) => {
            ReactGA.send({ hitType: "pageview", page: "/" });
    
            console.log(
            `App is changing to ${url} ${
                shallow ? 'with' : 'without'
            } shallow routing`
            )
        }
  
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => router.events.off('routeChangeComplete', handleRouteChange)
    }, [])
}

export default RouteChangeTracter
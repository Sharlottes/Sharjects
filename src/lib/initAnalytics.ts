import ReactGA from 'react-ga';

const initAnalytics = () => {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
}

export default initAnalytics;
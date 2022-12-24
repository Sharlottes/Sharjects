export const pageview = (url: unknown) => {
  window.gtag("config", process.env.GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

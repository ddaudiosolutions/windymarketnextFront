// lib/analytics.js
/* import ReactGA from "react-ga4"; */

/* export const initGA = () => {
  ReactGA.initialize('G-LN814BQ9FL');
}; */

/* export const logPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
}; */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_ID_ANALYTICS
export const pageview = url => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

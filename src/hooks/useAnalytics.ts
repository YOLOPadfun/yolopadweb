export const useAnalytics = () => {
  const sendEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, eventParams);
    }
  };

  return { sendEvent };
}; 
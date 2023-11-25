'use client';
import {usePageView} from '@/components/tracking/hook/pageView';
import {useWebVitals} from '@/components/tracking/hook/webVitals';


export const SiteTracking = () => {
  useWebVitals();
  usePageView();

  return null;
};

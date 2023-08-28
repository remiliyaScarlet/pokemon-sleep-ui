import React from 'react';

import {initialResult} from '@/ui/rating/calc/const';
import {RatingResultOfLevel} from '@/ui/rating/result/type';
import {RatingSetupData} from '@/ui/rating/setup/type';
import {RatingOpts, RatingWorkerOpts} from '@/ui/rating/type';


type UseRatingWorkerOpts = {
  setLoading: (loading: boolean) => void,
  opts: RatingOpts,
};

export const useRatingWorker = ({setLoading, opts}: UseRatingWorkerOpts) => {
  const {level} = opts;
  const [result, setResult] = React.useState<RatingResultOfLevel>({
    level,
    ...initialResult,
  });
  const worker = React.useMemo(() => new Worker(new URL('main', import.meta.url)), []);

  worker.onmessage = (event: MessageEvent<RatingResultOfLevel>) => {
    setLoading(false);
    setResult(event.data);
  };

  worker.onerror = (event) => {
    setLoading(false);
    console.error('Error event occurred in sorting worker', event);

    throw event;
  };

  const rate = (setupData: RatingSetupData) => {
    worker.postMessage({...opts, ...setupData} satisfies RatingWorkerOpts);
    setLoading(true);
  };

  const resetResult = () => {
    setResult((original) => ({...original, ...initialResult}));
  };

  React.useEffect(() => {
    return () => worker.terminate();
  }, []);

  return {result, resetResult, rate};
};

import React from 'react';

import {initialResult} from '@/const/game/rating';
import {RatingOpts, RatingResultOfLevel, RatingSetupData, RatingWorkerOpts} from '@/types/game/pokemon/rating';


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
  const worker = React.useMemo(() => new Worker(new URL('worker', import.meta.url)), []);

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

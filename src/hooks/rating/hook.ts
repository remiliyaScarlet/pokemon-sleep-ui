import React from 'react';

import {initialResult} from '@/const/game/rating';
import {RatingOpts, RatingResultOfLevel, RatingSetupData, RatingWorkerOpts} from '@/types/game/pokemon/rating';


type UseRatingWorkerOpts = {
  setLoading: (loading: boolean) => void,
  opts: RatingOpts,
};

export const useRatingWorker = ({setLoading, opts}: UseRatingWorkerOpts) => {
  const {
    level,
    pokemonProducingParams,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    subSkillMap,
  } = opts;
  const [result, setResult] = React.useState<RatingResultOfLevel>({
    level,
    ...initialResult,
  });
  const worker = React.useMemo(() => new Worker(new URL('main.worker', import.meta.url)), []);

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
    // Explicitly stating everything to make sure no additional props passed to the worker
    worker.postMessage({
      level,
      pokemon: setupData.pokemon,
      pokemonProducingParams,
      ingredients: setupData.ingredients,
      snorlaxFavorite: setupData.snorlaxFavorite,
      subSkill: setupData.subSkill,
      nature: setupData.nature,
      bonus: setupData.bonus,
      noCollectDurations: setupData.noCollectDurations,
      ingredientChainMap,
      ingredientMap,
      berryDataMap,
      subSkillMap,
    } satisfies RatingWorkerOpts);
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

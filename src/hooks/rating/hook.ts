import React from 'react';

import {initialResult} from '@/const/game/rating';
import {useWorker} from '@/hooks/worker';
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
  const {work} = useWorker<RatingWorkerOpts, RatingResultOfLevel>({
    workerName: 'Rating',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setResult(result);
    },
    onError: () => setLoading(false),
  });

  const rate = (setupData: RatingSetupData) => {
    // Explicitly stating everything to make sure no additional props passed to the worker
    work({
      level,
      pokemon: setupData.pokemon,
      pokemonProducingParams,
      ingredients: setupData.ingredients,
      snorlaxFavorite: setupData.snorlaxFavorite,
      subSkill: setupData.subSkill,
      nature: setupData.nature,
      evolutionCount: setupData.evolutionCount,
      bonus: setupData.bonus,
      sleepDurations: setupData.sleepDurations,
      ingredientChainMap,
      ingredientMap,
      berryDataMap,
      subSkillMap,
    });
    setLoading(true);
  };

  const resetResult = () => {
    setResult((original) => ({...original, ...initialResult}));
  };

  return {result, resetResult, rate};
};

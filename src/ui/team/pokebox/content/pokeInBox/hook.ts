import React from 'react';

import {initialResult} from '@/const/game/rating';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating';
import {toRatingWorkerOpts} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {workerPool} from '@/ui/team/pokebox/content/pokeInBox/workerPool';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const useCalculatePokeInBoxRating = (opts: PokeboxPokeInBoxCommonProps) => {
  const {pokeInBox, ratingCache, setRatingCache} = opts;
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<RatingResultOfLevel>(ratingCache[pokeInBox.uuid] ?? {
    ...initialResult,
    level: pokeInBox.level,
  });

  React.useEffect(() => {
    setLoading(true);

    workerPool.queue(async (rate) => {
      const calculatedResult = await rate(toRatingWorkerOpts(opts));

      if (calculatedResult) {
        setResult(calculatedResult);
        setRatingCache(pokeInBox.uuid, calculatedResult);
      }

      setLoading(false);

      if (!calculatedResult) {
        console.warn(`Failed to calculate the rating of ${pokeInBox.uuid}`);
        return;
      }
    });
  }, [pokeInBox]);

  return {loading, result};
};

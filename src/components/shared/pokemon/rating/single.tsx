import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import HandThumbDownIcon from '@heroicons/react/24/outline/HandThumbDownIcon';
import HandThumbUpIcon from '@heroicons/react/24/outline/HandThumbUpIcon';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {RatingDataPointUI} from '@/components/shared/pokemon/rating/point';
import {RatingResultUI} from '@/components/shared/pokemon/rating/result';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {useRatingWorker} from '@/hooks/rating/hook';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';


type Props = Omit<RatingResultProps, 'pokemonMaxLevel'> & {
  level: PokemonKeyLevel,
};

export const RatingResultOfLevelUI = ({
  request,
  level,
  pokemon,
  pokemonProducingParams,
  berryDataMap,
  ingredientChainMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const collapsible = useCollapsible();
  const {result, resetResult, rate} = useRatingWorker({
    setLoading,
    opts: {
      level,
      pokemon,
      pokemonProducingParams,
      berryDataMap,
      ingredientChainMap,
      ingredientMap,
      mainSkillMap,
      subSkillMap,
      mealMap,
      useNestedWorker: true,
    },
  });

  React.useEffect(() => {
    resetResult();
  }, [request]);

  React.useEffect(() => {
    if (!request) {
      return;
    }

    rate(request.setup);
  }, [request?.timestamp]);

  const {points} = result;
  const basis = request?.setup.basis;

  return (
    <LazyLoad loading={loading} loadingFullHeight className="info-section relative">
      <RatingResultUI result={result} level={level}/>
      <CollapsibleFull state={collapsible} disabled={!points.min && !points.current && !points.max} button={
        <Flex direction="row" center className="gap-1">
          <HandThumbDownIcon className="h-6 w-6"/>
          <HandThumbUpIcon className="h-6 w-6"/>
        </Flex>
      }>
        <Grid className="grid-rows-3 gap-1.5">
          <RatingDataPointUI
            level={level}
            point={points.max}
            subSkillMap={subSkillMap}
            icon={<HandThumbUpIcon/>}
            basis={basis}
            className="bg-green-500/10"
          />
          <RatingDataPointUI
            level={level}
            point={points.current}
            subSkillMap={subSkillMap}
            icon={<BeakerIcon/>}
            basis={basis}
            className="bg-slate-500/10"
          />
          <RatingDataPointUI
            level={level}
            point={points.min}
            subSkillMap={subSkillMap}
            icon={<HandThumbDownIcon/>}
            basis={basis}
            className="bg-red-500/10"
          />
        </Grid>
      </CollapsibleFull>
    </LazyLoad>
  );
};

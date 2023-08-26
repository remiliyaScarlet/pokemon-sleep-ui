'use client';
import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {PokemonId} from '@/types/game/pokemon';
import {useRatingWorker} from '@/ui/rating/calc/hook';
import {RatingFilter} from '@/ui/rating/filter/main';
import {RatingResultUI} from '@/ui/rating/result/main';
import {RatingSetup} from '@/ui/rating/setup/main';
import {RatingDataProps, RatingServerDataProps} from '@/ui/rating/type';
import {isNotNullish} from '@/utils/type';


export const RatingClient = (props: RatingServerDataProps) => {
  const {
    pokedexMap,
    berryDataMap,
    subSkillMap,
    ingredientChainMap,
    ingredientMap,
  } = props;
  const [pickedPokemonId, setPickedPokemonId] = React.useState<PokemonId>();
  const [loading, setLoading] = React.useState(false);

  const {result, rate} = useRatingWorker({
    setLoading,
    opts: {
      pokemon: pickedPokemonId ? pokedexMap[pickedPokemonId] : undefined,
      berryDataMap,
      subSkillMap,
      ingredientChainMap,
      ingredientMap,
    },
  });

  const data: RatingDataProps = {
    pokedex: Object.values(pokedexMap).filter(isNotNullish),
    ...props,
  };

  return (
    <Flex direction="col" className="gap-1.5">
      <RatingFilter {...data} onPokemonPicked={setPickedPokemonId}/>
      <AnimatedCollapse show={!!pickedPokemonId}>
        <RatingSetup {...data} pokemonId={pickedPokemonId} onInitiate={(setup) => rate(setup)}/>
      </AnimatedCollapse>
      <RatingResultUI loading={loading} result={result}/>
    </Flex>
  );
};

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
  const setupRef = React.useRef<HTMLDivElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

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
  const pokemon = pickedPokemonId ? pokedexMap[pickedPokemonId] : undefined;

  const scrollToSetup = () => setupRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
  const scrollToResult = () => resultRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <RatingFilter {...data} onPokemonPicked={(pokemonId) => {
          if (pickedPokemonId) {
            scrollToSetup();
          } else {
            setTimeout(scrollToSetup, 500);
          }

          setPickedPokemonId(pokemonId);
        }}/>
        <AnimatedCollapse show={!!pickedPokemonId}>
          {
            pokemon &&
            <RatingSetup ref={setupRef} {...data} pokemon={pokemon} onInitiate={(setup) => {
              const {points} = result;
              if (points.min || points.current || points.max) {
                scrollToResult();
              } else {
                setTimeout(scrollToResult, 500);
              }

              rate(setup);
            }}/>
          }
        </AnimatedCollapse>
      </Flex>
      <RatingResultUI ref={resultRef} loading={loading} result={result} subSkillMap={subSkillMap}/>
    </Flex>
  );
};

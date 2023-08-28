'use client';
import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {PokemonId} from '@/types/game/pokemon';
import {RatingFilter} from '@/ui/rating/filter/main';
import {RatingResultUI} from '@/ui/rating/result/main';
import {RatingSetup} from '@/ui/rating/setup/main';
import {RatingDataProps, RatingRequest, RatingServerDataProps} from '@/ui/rating/type';
import {isNotNullish} from '@/utils/type';


export const RatingClient = (props: RatingServerDataProps) => {
  const {pokedexMap} = props;
  const [pickedPokemonId, setPickedPokemonId] = React.useState<PokemonId>();
  const [request, setRequest] = React.useState<RatingRequest>();

  const setupRef = React.useRef<HTMLDivElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const data: RatingDataProps = {
    pokedex: Object.values(pokedexMap).filter(isNotNullish),
    ...props,
  };
  const pokemon = pickedPokemonId ? pokedexMap[pickedPokemonId] : undefined;

  const scrollToSetup = () => setupRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
  const scrollToResult = () => resultRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});

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
        <AnimatedCollapse show={!!pokemon}>
          {
            pokemon &&
            <RatingSetup
              ref={setupRef}
              pokemon={pokemon}
              onInitiate={(setup) => {
                scrollToResult();
                setRequest({
                  setup,
                  timestamp: Date.now(),
                });
              }}
              {...data}
            />
          }
        </AnimatedCollapse>
      </Flex>
      <AnimatedCollapse show={!!pokemon}>
        {pokemon && <RatingResultUI ref={resultRef} request={request} pokemon={pokemon} {...data}/>}
      </AnimatedCollapse>
    </Flex>
  );
};

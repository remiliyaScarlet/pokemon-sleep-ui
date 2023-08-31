'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {RatingRequest, RatingSetupData} from '@/types/game/pokemon/rating';
import {RatingFilter} from '@/ui/rating/filter/main';
import {RatingSetup} from '@/ui/rating/setup/main';
import {generateRatingSetup} from '@/ui/rating/setup/utils';
import {RatingDataProps, RatingServerDataProps} from '@/ui/rating/type';
import {isNotNullish} from '@/utils/type';


export const RatingClient = (props: RatingServerDataProps) => {
  const {
    pokedexMap,
    ingredientChainMap,
    preloadSetupBonus,
  } = props;
  const [initialSetup, setInitialSetup] = React.useState<RatingSetupData>();
  const [request, setRequest] = React.useState<RatingRequest>();

  const setupRef = React.useRef<HTMLDivElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const data: RatingDataProps = {
    pokemonList: Object.values(pokedexMap).filter(isNotNullish),
    ...props,
  };

  const scrollToSetup = () => setupRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
  const scrollToResult = () => resultRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <RatingFilter {...data} onPokemonPicked={(opts) => {
          const {origin, pokemon} = opts;

          if (initialSetup) {
            scrollToSetup();
          } else {
            setTimeout(scrollToSetup, 500);
          }

          const setup = generateRatingSetup({
            ...opts,
            chain: ingredientChainMap[pokemon.ingredientChain],
            ingredientChainMap,
            preloadSetupBonus,
          });

          setInitialSetup(setup);
          if (origin === 'pokebox') {
            setRequest({setup, timestamp: Date.now()});
            scrollToResult();
          } else if (origin === 'pokedex' && request) {
            setRequest({...request, setup});
          }
        }}/>
        <AdsUnit className="block md:hidden"/>
        <AnimatedCollapse show={!!initialSetup}>
          {
            initialSetup &&
            <RatingSetup
              ref={setupRef}
              initialSetup={initialSetup}
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
      <AdsUnit/>
      <AnimatedCollapse show={!!initialSetup}>
        {
          initialSetup &&
          <RatingResult ref={resultRef} request={request} pokemon={initialSetup.pokemon} {...data}/>
        }
      </AnimatedCollapse>
    </Flex>
  );
};

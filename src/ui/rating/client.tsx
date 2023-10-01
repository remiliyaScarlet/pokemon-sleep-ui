'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {useUserSettings} from '@/hooks/userData/settings';
import {RatingRequest} from '@/types/game/pokemon/rating';
import {RatingFilter} from '@/ui/rating/filter/main';
import {RatingSetup} from '@/ui/rating/setup/main';
import {generateRatingInputs} from '@/ui/rating/setup/utils';
import {RatingDataProps, RatingServerDataProps, RatingSetupInputs} from '@/ui/rating/type';
import {toRatingRequest} from '@/ui/rating/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';
import {isNotNullish} from '@/utils/type';


export const RatingClient = (props: RatingServerDataProps) => {
  const {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    preloadSettings,
  } = props;
  const [initialSetup, setInitialSetup] = React.useState<RatingSetupInputs>();
  const [request, setRequest] = React.useState<RatingRequest>();
  const {data: session} = useSession();
  const calculatedSettings = useUserSettings({
    server: preloadSettings,
    client: session?.user.preloaded.settings,
  });

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

          const setup = generateRatingInputs({
            ...opts,
            ...calculatedSettings,
            chain: ingredientChainMap[pokemon.ingredientChain],
            ingredientChainMap,
          });

          setInitialSetup(setup);

          if (origin === 'pokebox') {
            setRequest(toRatingRequest({setup, calculatedSettings}));
            scrollToResult();
          } else if (origin === 'pokedex' && request) {
            // This is for resetting the result layout
            setRequest(toRatingRequest({
              setup,
              calculatedSettings,
              timestamp: request.timestamp,
            }));
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
                setRequest(toRatingRequest({setup, calculatedSettings}));
              }}
              {...data}
            />
          }
        </AnimatedCollapse>
      </Flex>
      <AnimatedCollapse show={!!initialSetup}>
        {
          initialSetup &&
          <RatingResult
            ref={resultRef}
            request={request}
            pokemon={initialSetup.pokemon}
            pokemonProducingParams={getPokemonProducingParams({
              pokemonId: initialSetup.pokemon.id,
              pokemonProducingParamsMap,
            })}
            {...data}
          />
        }
      </AnimatedCollapse>
    </Flex>
  );
};

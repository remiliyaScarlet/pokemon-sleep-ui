'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {defaultNeutralOpts} from '@/const/game/production';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useUserSettings} from '@/hooks/userData/settings';
import {PokedexResultCount} from '@/ui/pokedex/index/count';
import {useFilteredPokedex} from '@/ui/pokedex/index/filter';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {toCalculateAllIngredientPossibilities} from '@/ui/pokedex/index/utils';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


export const PokedexClient = (props: PokedexClientCommonProps) => {
  const {
    pokedex,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    preloaded,
  } = props;

  const {data: session} = useSession();
  const [loading, setLoading] = React.useState(false);
  const {filter, setFilter, isIncluded} = useFilteredPokedex({
    data: pokedex,
    preloadedDisplay: preloaded.display,
    ...props,
  });

  const calculatedSettings = useUserSettings({
    server: preloaded.settings,
    client: session?.user.preloaded.settings,
  });

  const sortingDeps = [filter, calculatedSettings];

  const data = React.useMemo(() => pokedex.flatMap((pokemon): PokemonInfoWithSortingPayload<null>[] => {
    const commonOpts: Omit<PokemonInfoWithSortingPayload<null>, 'ingredients'> = {
      pokemon: pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      level: filter.level,
      dateAdded: null,
      extra: null,
      ...defaultNeutralOpts,
    };

    if (!toCalculateAllIngredientPossibilities(filter)) {
      return [{
        ...commonOpts,
        ingredients: [],
      }];
    }

    return [...generatePossibleIngredientProductions({
      level: filter.level,
      chain: ingredientChainMap[pokemon.ingredientChain],
    })]
      .map((ingredients) => ({...commonOpts, ingredients}));
  }), sortingDeps);
  const sortedData = useSortingWorker({
    data,
    sort: filter.sort,
    ingredientMap,
    berryDataMap,
    snorlaxFavorite: filter.snorlaxFavorite,
    calculatedSettings,
    triggerDeps: sortingDeps,
    setLoading,
  });

  useAutoUpload({
    opts: {
      type: 'pokedex',
      data: {
        sort: filter.sort,
        display: filter.display,
        version: filter.version,
      },
    },
    triggerDeps: [filter.sort, filter.display],
  });

  return (
    <>
      <AdsUnit/>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <PokedexResultCount data={sortedData} inclusionMap={isIncluded}/>
      <LazyLoad loading={loading}>
        <Grid className={clsx(
          filter.display === 'mainSkill' ?
            // Main skill is the only content with long words that's unable to truncate,
            // therefore the column breakpoints should be specialized
            // to avoid making all the other display type having a lot of spaces
            'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5' :
            'grid-cols-2 gap-1.5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6',
        )}>
          {sortedData.map(({source}) => {
            const pokemonId = source.pokemon.id;
            const key = `${pokemonId}-${source.ingredients.map(({id}) => id).join('-')}`;

            if (!isIncluded[pokemonId]) {
              return <React.Fragment key={key}/>;
            }

            return (
              <PokedexLink
                key={key}
                pokemon={source.pokemon}
                pokemonProducingParams={getPokemonProducingParams({
                  pokemonId,
                  pokemonProducingParamsMap,
                })}
                display={filter.display}
                level={filter.level}
                snorlaxFavorite={filter.snorlaxFavorite}
                ingredients={source.ingredients}
                calculatedSettings={calculatedSettings}
                {...props}
              />
            );
          })}
        </Grid>
      </LazyLoad>
      <AdsUnit/>
    </>
  );
};

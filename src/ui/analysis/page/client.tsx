'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';
import {useAnalysisFilter} from '@/ui/analysis/page/hook';
import {AnalysisPageInput} from '@/ui/analysis/page/input/main';
import {AnalysisMeta} from '@/ui/analysis/page/meta';
import {AnalysisStatsUI} from '@/ui/analysis/page/stats/main';
import {AnalysisComparisonFilter, AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {useCalculationWorker} from '@/ui/analysis/page/worker';
import {toUnique} from '@/utils/array';
import {groupIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';


export const AnalysisPageClient = (props: AnalysisPageCommonProps) => {
  const {
    pokedex,
    pokemon,
    berryDataMap,
    sleepStyleMap,
    ingredientChainMap,
  } = props;

  const [stats, setStats] = React.useState<AnalysisStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const {filter, setFilter, isIncluded} = useAnalysisFilter({
    data: pokedex.map((pokemon) => ({
      info: pokemon,
      mapsAvailable: toUnique(sleepStyleMap[pokemon.id]?.map(({mapId}) => mapId) ?? []),
    })),
    currentPokemon: pokemon,
    ...props,
  });
  const ingredients = React.useMemo(() => groupIngredientProductions(
    getEffectiveIngredientLevels(filter.level)
      .map((level) => filter.ingredients[level]),
  ), [filter]);

  useCalculationWorker({
    ...props,
    level: filter.level,
    ingredients,
    pokemonToAnalyze: pokedex.filter(({id}) => isIncluded[id]),
    snorlaxFavorite: filter.snorlaxFavorite,
    setStats,
    setLoading,
    calculateDeps: [filter],
  });

  return (
    <Flex direction="col" className="gap-1">
      <AnalysisMeta {...props}/>
      <PokemonIngredientPicker
        chain={ingredientChainMap[pokemon.ingredientChain]}
        ingredients={filter.ingredients}
        onSelect={(updated, ingredientLevel) => setFilter((filter) => ({
          ...filter,
          ingredients: {
            ...filter.ingredients,
            [ingredientLevel]: updated,
          },
        } satisfies AnalysisComparisonFilter))}
        idPrefix={pokemon.id.toString()}
      />
      <AdsUnit/>
      <HorizontalSplitter/>
      <AnalysisPageInput
        filter={filter}
        setFilter={setFilter}
        maxLevel={berryDataMap[pokemon.berry.id].energy.length}
        {...props}
      />
      <AdsUnit/>
      <AnalysisStatsUI stats={stats} loading={loading} level={filter.level} {...props}/>
      <AdsUnit/>
    </Flex>
  );
};

import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonMapFilter} from '@/components/shared/pokemon/filter/map';
import {PokemonLevelSliderRow} from '@/components/shared/pokemon/level/sliderRow';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {AnalysisComparisonFilter, AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props = FilterWithUpdaterProps<AnalysisComparisonFilter> & AnalysisPageCommonProps & {
  maxLevel: number,
};

export const AnalysisPageInput = ({
  filter,
  setFilter,
  maxLevel,
  pokemonList,
  sleepStyleMap,
  mapMeta,
  ...props
}: Props) => {
  const collapsible = useCollapsible();

  return (
    <Collapsible appear state={collapsible} classNameForHeight="h-72 md:h-52" button={
      <Flex direction="row" center className="gap-0.5">
        <FunnelIcon className="h-6 w-6"/>
      </Flex>
    }>
      <Flex className="gap-1 pr-1">
        <PokemonMapFilter
          mapIds={toUnique(Object
            .values(sleepStyleMap)
            .flatMap((sleepStyle) => sleepStyle?.map(({mapId}) => mapId))
            .filter(isNotNullish)
            .sort((a, b) => a - b))}
          {...getMultiSelectOnClickProps({
            filter,
            setFilter,
            filterKey: 'mapId',
          })}
        />
        <PokemonFilter
          {...props}
          filter={filter}
          setFilter={setFilter}
          pokemonList={pokemonList}
        />
        <PokemonLevelSliderRow
          value={filter.level}
          max={maxLevel}
          setValue={(level) => setFilter((original) => ({
            ...original,
            level,
          } satisfies AnalysisComparisonFilter))}
        />
        <SnorlaxFavoriteInput
          filter={filter}
          setFilter={setFilter}
          filterKey="snorlaxFavorite"
          pokemonList={pokemonList}
          mapMeta={mapMeta}
        />
      </Flex>
    </Collapsible>
  );
};

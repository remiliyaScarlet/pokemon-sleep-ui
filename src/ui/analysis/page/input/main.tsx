import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';

import {InputRow} from '@/components/input/filter/row';
import {FilterInputProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {PokemonMapFilter} from '@/components/shared/pokemon/input/mapFilter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {AnalysisComparisonFilter, AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props = FilterInputProps<AnalysisComparisonFilter> & AnalysisPageCommonProps & {
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
        <div className="h-6 w-6">
          <FunnelIcon/>
        </div>
      </Flex>
    }>
      <Flex direction="col" className="gap-1">
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
        {pokemonInputType.map((type) => (
          <PokemonFilter
            {...props}
            key={type}
            type={type}
            filterKey={type}
            filter={filter}
            setFilter={setFilter}
            pokemonList={pokemonList}
          />
        ))}
        <InputRow>
          <Flex direction="col" className="p-1">
            <PokemonLevelSlider
              level={filter.level}
              maxLevel={maxLevel}
              setLevel={(level) => setFilter((original) => ({
                ...original,
                level,
              } satisfies AnalysisComparisonFilter))}
            />
          </Flex>
        </InputRow>
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

import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {FilterInputProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {PokemonMapFilter} from '@/components/shared/pokemon/input/mapFilter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {AnalysisComparisonFilter, AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props = FilterInputProps<AnalysisComparisonFilter> & AnalysisPageCommonProps & {
  maxLevel: number,
};

export const AnalysisPageInput = ({filter, setFilter, maxLevel, pokedex, sleepStyleMap, mapMeta}: Props) => {
  return (
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
          key={type}
          type={type}
          filterKey={type}
          pokemon={pokedex}
          filter={filter}
          setFilter={setFilter}
        />
      ))}
      <InputRow>
        <Flex direction="col" className="p-1">
          <PokemonLevelSlider level={filter.level} maxLevel={maxLevel} setLevel={(level) => setFilter((original) => ({
            ...original,
            level,
          } satisfies AnalysisComparisonFilter))}/>
        </Flex>
      </InputRow>
      <SnorlaxFavoriteInput
        filter={filter}
        setFilter={setFilter}
        filterKey="snorlaxFavorite"
        pokemon={pokedex}
        mapMeta={mapMeta}
      />
    </Flex>
  );
};

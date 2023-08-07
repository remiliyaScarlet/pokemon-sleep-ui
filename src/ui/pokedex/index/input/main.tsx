import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {imageGallerySizes} from '@/styles/image';
import {displayTypeToTranslationId, sortTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {pokedexDisplayType, PokedexInputProps, pokedexSortType} from '@/ui/pokedex/index/input/type';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {toUnique} from '@/utils/array';


type Props = PokedexInputProps & PokedexClientCommonProps;

export const PokedexInput = ({pokedex, maxLevel, ...props}: Props) => {
  const {filter, setFilter} = props;
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="col" className="h-72 gap-1 overflow-x-hidden overflow-y-scroll md:h-52">
      <FilterTextInput
        style="highlight"
        title={t2('Info.Map')}
        idToItemId={(id) => `Map-${id}`}
        ids={toUnique(pokedex.flatMap(({sleepStyles}) => sleepStyles.map(({mapId}) => mapId))).sort((a, b) => a - b)}
        idToButton={(id) => {
          const mapName = t(`Field.${id}`);

          return (
            <>
              <div className="relative -mx-2 h-full w-28 md:w-40">
                <NextImage
                  src={`/images/field/${id}.png`} alt={mapName}
                  sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
                />
              </div>
              <Flex direction="row" center className="absolute z-10 h-full">
                {mapName}
              </Flex>
            </>
          );
        }}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mapId',
        })}
      />
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          style={type === 'sleepType' || type === 'ingredientFixed' ? 'highlight' : 'normal'}
          type={type}
          filterKey={type}
          pokemon={pokedex}
          {...props}
        />
      ))}
      <InputRow>
        <Flex direction="col" className="p-1">
          <PokemonLevelSlider level={filter.level} maxLevel={maxLevel} setLevel={(level) => setFilter((original) => ({
            ...original,
            level,
          } satisfies PokedexInputProps['filter']))}/>
        </Flex>
      </InputRow>
      <FilterTextInput
        onClick={(display) => setFilter((original) => ({
          ...original,
          display,
        } satisfies PokedexInputProps['filter']))}
        isActive={(display) => filter.display === display}
        title={
          <Flex direction="row" center>
            <div className="h-6 w-6">
              <InformationCircleIcon/>
            </div>
          </Flex>
        }
        ids={[...pokedexDisplayType]}
        idToButton={(display) => t2(displayTypeToTranslationId[display])}
        idToItemId={(display) => `displayType-${display}`}
      />
      <FilterTextInput
        onClick={(sort) => setFilter((original) => ({
          ...original,
          sort,
        } satisfies PokedexInputProps['filter']))}
        isActive={(sort) => filter.sort === sort}
        title={
          <Flex direction="row" center>
            <div className="h-6 w-6">
              <Bars3BottomLeftIcon/>
            </div>
          </Flex>
        }
        ids={[...pokedexSortType]}
        idToButton={(sort) => t2(sortTypeToTranslationId[sort])}
        idToItemId={(sort) => `sortType-${sort}`}
      />
    </Flex>
  );
};

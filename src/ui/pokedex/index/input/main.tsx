import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {imageGallerySizes} from '@/styles/image';
import {displayTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexData, pokedexDisplayType} from '@/ui/pokedex/index/type';
import {toUnique} from '@/utils/array';


type Props = PokedexInputProps & {
  data: PokedexData,
};

export const PokedexInput = ({data, ...props}: Props) => {
  const {filter, setFilter} = props;
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="gap-1">
      <FilterTextInput
        style="highlight"
        title={t2('Map')}
        idToItemId={(id) => `Map-${id}`}
        ids={toUnique(data.flatMap(({sleepStyles}) => sleepStyles.map(({mapId}) => mapId))).sort((a, b) => a - b)}
        idToButton={(id) => {
          const mapName = t(`Field.${id.toString()}`);

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
          pokemon={data}
          {...props}
        />
      ))}
      <FilterTextInput
        onClick={(display) => setFilter((original) => ({
          ...original,
          display,
        }))}
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
    </Flex>
  );
};

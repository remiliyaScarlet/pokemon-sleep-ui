import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {imageGallerySizes} from '@/styles/image';
import {pokedexDisplayType} from '@/ui/pokedex/index/const';
import {displayTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexData} from '@/ui/pokedex/index/type';
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
      <PokemonFilter
        type="pokemonType"
        filterKey="pokemonType"
        pokemon={data}
        {...props}
      />
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
                <Image
                  src={`/images/field/${id}.png`} alt={mapName}
                  fill className="rounded-xl opacity-50 dark:opacity-25"
                  sizes={imageGallerySizes}
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
      <PokemonFilter
        style="highlight"
        type="sleepType"
        filterKey="sleepType"
        pokemon={data}
        {...props}
      />
      <PokemonFilter
        type="ingredientFixed"
        filterKey="ingredientFixed"
        pokemon={data}
        {...props}
      />
      <PokemonFilter
        type="ingredientRandom"
        filterKey="ingredientRandom"
        pokemon={data}
        {...props}
      />
      <PokemonFilter
        type="berry"
        filterKey="berry"
        pokemon={data}
        {...props}
      />
      <PokemonFilter
        type="mainSkill"
        filterKey="mainSkill"
        pokemon={data}
        {...props}
      />
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

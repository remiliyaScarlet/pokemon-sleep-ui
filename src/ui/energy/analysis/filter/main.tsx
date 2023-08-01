import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {imageSmallIconSizes} from '@/styles/image';
import {EnergyAnalysisInputProps} from '@/ui/energy/analysis/type';
import {toUnique} from '@/utils/array';


export const EnergyAnalysisPokemonFilter = ({pokemon, ...props}: EnergyAnalysisInputProps) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Energy');

  return (
    <Flex direction="col" className="gap-1">
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          type={type}
          filterKey={type}
          pokemon={pokemon}
          {...props}
        />
      ))}
      <FilterIconInput
        title={
          <Flex direction="row" center>
            <div className="relative h-7 w-7">
              <Image src="/images/generic/snorlax.png" alt={t2('SnorlaxFavorite')} fill sizes={imageSmallIconSizes}/>
            </div>
          </Flex>
        }
        idToItemId={(id) => `Snorlax-${id}`}
        idToAlt={(id) => t(`Berry.${id.toString()}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        ids={toUnique(pokemon.map(({berry}) => berry.id)).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'snorlaxFavorite',
        })}
      />
    </Flex>
  );
};

import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconClickable} from '@/components/shared/pokemon/icon/clickable';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {usePokeboxPickerFilter} from '@/ui/team/pokebox/filter/hook';
import {showToast} from '@/utils/toast';


type Props = {
  pokemon: PokemonInfo[],
  onClick: (pokemonId: PokemonId) => void,
};

export const PokeboxPickerInput = ({pokemon, onClick}: Props) => {
  const t = useTranslations('Game');

  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxPickerFilter({data: pokemon});

  return (
    <>
      <Flex direction="col" className="h-72 gap-1 overflow-x-hidden overflow-y-scroll pr-1 md:h-52">
        {pokemonInputType.map((type) => (
          <PokemonFilter
            key={type}
            type={type}
            pokemon={pokemon}
            filterKey={type}
            filter={filter}
            setFilter={setFilter}
            idPrefix="picker-"
          />
        ))}
      </Flex>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <PokemonIconClickable pokemon={pokemon.filter(({id}) => isIncluded[id])} onClick={(id) => {
          showToast({content: (
            <Flex direction="row" className="gap-1.5">
              <div className="relative h-10 w-10">
                <PlusCircleIcon/>
              </div>
              <div className="relative h-10 w-10">
                <NextImage
                  src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
                  sizes={imageIconSizes}
                />
              </div>
            </Flex>
          )});
          onClick(id);
        }}/>
      </div>
    </>
  );
};

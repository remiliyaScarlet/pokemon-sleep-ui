import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {FilterIconInput} from '@/components/input/filter/icon';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterInputProps} from '@/components/input/filter/type';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {pokeboxDisplayTypeToI18nId, pokeboxDisplayTypeToImageSrc} from '@/ui/team/pokebox/viewer/const';
import {pokeboxDisplayType, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';


type Props = FilterInputProps<PokeboxViewerFilter> & {
  pokemon: PokemonInfo[],
};

export const PokeboxViewerInput = ({filter, setFilter, pokemon}: Props) => {
  const t = useTranslations('UI.InPage.Team.Box.DisplayType');
  const t2 = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="col" className="h-72 gap-1 overflow-x-hidden overflow-y-scroll pr-1 md:h-52">
      <InputRowWithTitle title={t2('Info.Name')}>
        <InputBox type="text" value={filter.name} onChange={({target}) => setFilter((original) => ({
          ...original,
          name: target.value,
        }))}/>
      </InputRowWithTitle>
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          type={type}
          pokemon={pokemon}
          filterKey={type}
          filter={filter}
          setFilter={setFilter}
          idPrefix="viewer-"
        />
      ))}
      <PokemonSortingPicker
        sort={filter.sort}
        updateSort={(sort) => setFilter((original) => ({...original, sort}))}
        exclude={['friendshipPoint']}
      />
      <FilterIconInput
        title={
          <Flex direction="col" center>
            <div className="h-6 w-6">
              <InformationCircleIcon/>
            </div>
          </Flex>
        }
        ids={[...pokeboxDisplayType]}
        idToItemId={(type) => type}
        idToAlt={(type) => t(pokeboxDisplayTypeToI18nId[type])}
        idToImageSrc={(type) => pokeboxDisplayTypeToImageSrc[type]}
        idToImageClassName={(type) => clsx(type !== filter.displayType ? 'invert-on-light' : 'invert-on-dark')}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'displayType',
          allowNull: false,
        })}
      />
    </Flex>
  );
};

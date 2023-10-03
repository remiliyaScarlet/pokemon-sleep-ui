import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {inputSectionHeight} from '@/ui/team/pokebox/const';
import {PokeboxViewerInputCommonProps} from '@/ui/team/pokebox/viewer/type';


export const PokeboxViewerFilterUI = (props: PokeboxViewerInputCommonProps) => {
  const {filter, setFilter} = props;

  const filterCollapsible = useCollapsible();
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Collapsible state={filterCollapsible} classNameForHeight={inputSectionHeight} button={
      <Flex direction="row" center className="gap-0.5">
        <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
        <div className="h-6 w-6">
          <EyeIcon/>
        </div>
        <div className="h-6 w-6">
          <FunnelIcon/>
        </div>
      </Flex>
    }>
      <Flex className="gap-1 pr-1">
        <InputRowWithTitle title={t('Info.Name')}>
          <InputBox type="text" value={filter.name} onChange={({target}) => setFilter((original) => ({
            ...original,
            name: target.value,
          }))}/>
        </InputRowWithTitle>
        {pokemonInputType.map((type) => (
          <PokemonFilter
            key={type}
            type={type}
            filterKey={type}
            idPrefix="viewer-"
            {...props}
          />
        ))}
      </Flex>
    </Collapsible>
  );
};

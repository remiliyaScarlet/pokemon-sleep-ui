import React from 'react';

import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterIconInput} from '@/components/input/filter/icon';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterInputProps} from '@/components/input/filter/type';
import {getIconFilterButtonClass, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {
  pokeboxDisplayTypeToI18nId,
  pokeboxDisplayTypeToImageSrc,
  pokeboxViewTypeToIcon,
} from '@/ui/team/pokebox/viewer/const';
import {
  pokeboxDisplayType,
  PokeboxViewerFilter,
  PokeboxViewType,
  pokeboxViewType,
} from '@/ui/team/pokebox/viewer/type';


type Props = FilterInputProps<PokeboxViewerFilter> & {
  pokemon: PokemonInfo[],
  mapMeta: FieldMetaMap,
};

export const PokeboxViewerInput = (props: Props) => {
  const {filter, setFilter, pokemon} = props;
  const t = useTranslations('UI.InPage.Team.Box.DisplayType');
  const t2 = useTranslations('UI.InPage.Pokedex');

  const filterCollapsible = useCollapsible();
  const viewCollapsible = useCollapsible();

  return (
    <>
      <Collapsible state={filterCollapsible} classNameForHeight="h-72 md:h-52" button={
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
        <Flex direction="col" className="gap-1 pr-1">
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
        </Flex>
      </Collapsible>
      <Collapsible state={viewCollapsible} classNameForHeight="h-56 md:h-32" appear button={
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <div className="h-6 w-6">
            <AdjustmentsHorizontalIcon/>
          </div>
        </Flex>
      }>
        <Flex direction="col" className="gap-1 pr-1">
          <PokemonSortingPicker
            sort={filter.sort}
            updateSort={(sort) => setFilter((original) => ({...original, sort}))}
            exclude={['friendshipPoint']}
          />
          <SnorlaxFavoriteInput
            filterKey="snorlaxFavorite"
            {...props}
          />
          <FilterCategoryInput
            title={
              <Flex direction="col" center>
                <div className="h-6 w-6">
                  <EyeIcon/>
                </div>
              </Flex>
            }
            ids={[...pokeboxViewType]}
            idToButton={(type: PokeboxViewType) => (
              <div className="h-6 w-6">
                {pokeboxViewTypeToIcon[type]}
              </div>
            )}
            idToItemId={(type) => type}
            getClassNames={getIconFilterButtonClass}
            {...getSingleSelectOnClickProps({
              filter,
              setFilter,
              filterKey: 'viewType',
              allowNull: false,
            })}
          />
          {filter.viewType === 'grid' && <FilterIconInput
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
          />}
        </Flex>
      </Collapsible>
    </>
  );
};

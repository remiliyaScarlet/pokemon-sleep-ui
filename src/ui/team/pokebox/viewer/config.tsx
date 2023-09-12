import React from 'react';

import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterIconInput} from '@/components/input/filter/icon';
import {
  getIconFilterButtonClass,
  getMultiSelectOnClickProps,
  getSingleSelectOnClickProps,
} from '@/components/input/filter/utils/props';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {inputSectionHeight} from '@/ui/team/pokebox/const';
import {
  pokeboxDisplayTypeToI18nId,
  pokeboxDisplayTypeToImageSrc,
  pokeboxViewTypeToIcon,
} from '@/ui/team/pokebox/viewer/const';
import {
  pokeboxDisplayType,
  pokeboxPreviewLevel,
  PokeboxViewerInputCommonProps,
  PokeboxViewType,
  pokeboxViewType,
} from '@/ui/team/pokebox/viewer/type';


export const PokeboxViewerConfig = (props: PokeboxViewerInputCommonProps) => {
  const {filter, setFilter} = props;

  const viewCollapsible = useCollapsible();
  const t = useTranslations('UI.InPage.Team.Box.DisplayType');

  return (
    <Collapsible state={viewCollapsible} classNameForHeight={inputSectionHeight} appear button={
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
        <FilterCategoryInput
          title={
            <Flex direction="row" center className="gap-1.5">
              <div className="h-6 w-6">
                <EyeIcon/>
              </div>
              <PokemonDataIcon src="/images/generic/lv.png" alt="Lv" invert/>
            </Flex>
          }
          ids={[null, ...[...pokeboxPreviewLevel].sort((a, b) => a - b)]}
          idToButton={(level) => (
            level === null ?
              <div className="h-7 w-7">
                <XMarkIcon/>
              </div> :
              <>{level}</>
          )}
          idToItemId={(level) => `previewLevel-${level}`}
          getClassNames={getIconFilterButtonClass}
          {...getSingleSelectOnClickProps({
            filter,
            setFilter,
            filterKey: 'previewLevel',
            allowNull: false,
          })}
        />
        {
          filter.viewType === 'grid' &&
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
            idToImageClassName={(type) => clsx(type === filter.displayOfGrid ? 'invert-on-dark' : 'invert-on-light')}
            {...getSingleSelectOnClickProps({
              filter,
              setFilter,
              filterKey: 'displayOfGrid',
              allowNull: false,
            })}
          />
        }
        {
          filter.viewType === 'table' &&
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
            idToImageClassName={(type) => clsx(filter.displayOfTable[type] ? 'invert-on-dark' : 'invert-on-light')}
            {...getMultiSelectOnClickProps({
              filter,
              setFilter,
              filterKey: 'displayOfTable',
            })}
          />
        }
      </Flex>
    </Collapsible>
  );
};

import React from 'react';

import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterCategoryInput} from '@/components/input/filter/category';
import {FilterIconInput} from '@/components/input/filter/icon';
import {InputRow} from '@/components/input/filter/row';
import {
  getIconFilterButtonClass,
  getMultiSelectOnClickProps,
  getSingleSelectOnClickProps,
  getTextFilterButtonClass,
} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {RatingBasisSelectionNullable} from '@/components/shared/pokemon/rating/basis/selection/nullable';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
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


export const PokeboxViewerConfig = ({session, ...props}: PokeboxViewerInputCommonProps) => {
  const {filter, setFilter} = props;

  const viewCollapsible = useCollapsible();
  const {showPremiumRequiredToast} = usePremiumRequiredToast();
  const t = useTranslations('UI.InPage.Team.Box.DisplayType');
  const t2 = useTranslations('UI.InPage.Pokedex.Input');

  return (
    <Collapsible state={viewCollapsible} classNameForHeight={inputSectionHeight} appear button={
      <Flex direction="row" center className="gap-0.5">
        <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
        <div className="h-6 w-6">
          <AdjustmentsHorizontalIcon/>
        </div>
      </Flex>
    }>
      <Flex className="gap-1 pr-1">
        <PokemonSortingPicker
          sort={filter.sort}
          updateSort={(sort) => setFilter((original) => ({...original, sort}))}
          exclude={['friendshipPoint']}
        />
        <RatingBasisSelectionNullable
          current={filter.ratingBasis}
          onSelect={(ratingBasis) => setFilter((original) => ({...original, ratingBasis}))}
          idPrefix="pokeboxViewer"
        />
        <SnorlaxFavoriteInput
          filterKey="snorlaxFavorite"
          {...props}
        />
        <FilterCategoryInput
          title={
            <Flex center>
              <EyeIcon className="h-6 w-6"/>
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
              <EyeIcon className="h-6 w-6"/>
              <LevelIcon/>
            </Flex>
          }
          ids={[null, ...[...pokeboxPreviewLevel].sort((a, b) => a - b)]}
          idToButton={(level) => (
            level === null ?
              <div className="h-7 w-7">
                <XMarkIcon/>
              </div> :
              level
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
              <Flex center>
                <InformationCircleIcon className="h-6 w-6"/>
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
              <Flex center>
                <InformationCircleIcon className="h-6 w-6"/>
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
        <InputRow className="justify-end">
          <ToggleButton
            id="pokeboxPreviewFinalEvo"
            active={filter.previewFinalEvolution}
            onClick={() => {
              if (!session?.user.activation?.premium) {
                showPremiumRequiredToast();
                return;
              }

              setFilter((original) => ({
                ...original,
                previewFinalEvolution: !original.previewFinalEvolution,
              }));
            }}
            className={clsx('group', getTextFilterButtonClass(filter.previewFinalEvolution))}
          >
            {t2('FinalEvolution')}
          </ToggleButton>
        </InputRow>
      </Flex>
    </Collapsible>
  );
};

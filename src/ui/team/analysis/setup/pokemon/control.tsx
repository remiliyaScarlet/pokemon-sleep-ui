import React from 'react';

import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';


type Props = TeamAnalysisPokemonProps & {
  ratingControl: RatingPopupControl,
  onEditClick: () => void,
  onDetailsClick: () => void,
};

export const TeamAnalysisPokemonControl = (props: Props) => {
  const {
    member,
    pokemon,
    snorlaxFavorite,
    calculatedSettings,
    ratingControl,
    onEditClick,
    onDetailsClick,
  } = props;

  const t = useTranslations('UI.Metadata');

  return (
    <Flex direction="row" className="items-center justify-between">
      <Flex direction="row" noFullWidth>
        <button className="button-clickable-bg group p-1" onClick={() => ratingControl.sendRequest(toRatingSetup({
          member,
          pokemon,
          snorlaxFavorite,
          ...calculatedSettings,
        }))}>
          <GenericIconLarger src="/images/generic/search.png" alt={t('Rating.Title')} dimension="h-5 w-5"/>
        </button>
      </Flex>
      <Flex direction="row" noFullWidth className="gap-1.5">
        <button className="button-clickable-bg p-1" onClick={onDetailsClick}>
          <ChartBarIcon className="h-5 w-5"/>
        </button>
        <button className="button-clickable-bg p-1" onClick={onEditClick}>
          <PencilIcon className="h-5 w-5"/>
        </button>
      </Flex>
    </Flex>
  );
};

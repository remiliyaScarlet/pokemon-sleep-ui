import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toPokeInBox, toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';


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
  const {act, status} = useUserDataActor();

  const commonButtonStyle = 'button-clickable-bg h-7 w-7 p-1';

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
        <button className={commonButtonStyle} onClick={() => {
          if (!act) {
            return;
          }

          act({
            action: 'upload',
            options: {
              type: 'pokebox.create',
              data: toPokeInBox(member),
            },
          });
        }}>
          {status !== 'waiting' ? actionStatusIcon[status] : <ArrowTopRightOnSquareIcon/>}
        </button>
        <button className={commonButtonStyle} onClick={onDetailsClick}>
          <ChartBarIcon/>
        </button>
        <button className={commonButtonStyle} onClick={onEditClick}>
          <PencilIcon/>
        </button>
      </Flex>
    </Flex>
  );
};

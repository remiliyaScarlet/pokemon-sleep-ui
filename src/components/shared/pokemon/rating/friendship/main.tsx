import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FriendshipLevelOfGoldLock, friendshipLevelsOfGoldLock} from '@/types/game/pokemon/subSkill';


type Props = {
  current: FriendshipLevelOfGoldLock,
  onUpdated: (selected: FriendshipLevelOfGoldLock) => void,
};

export const RatingFriendshipLevel = ({current, onUpdated}: Props) => {
  const t = useTranslations('UI.InPage.Rating');

  return (
    <FilterTextInput
      onClick={(level) => onUpdated(level)}
      isActive={(level) => level === current}
      title={t('FriendshipLevel')}
      ids={[...friendshipLevelsOfGoldLock]}
      idToButton={(level) => `${level}+`}
      idToItemId={(level) => `friendship${level}`}
    />
  );
};

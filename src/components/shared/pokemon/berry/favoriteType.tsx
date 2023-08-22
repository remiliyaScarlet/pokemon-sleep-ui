import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';

import {BerryFavoriteType} from '@/types/game/mapMeta';


type Props = {
  type: BerryFavoriteType,
};

export const BerryFavoriteInMapType = ({type}: Props) => {
  if (type === 'fixed') {
    return <LockClosedIcon/>;
  }

  if (type === 'random') {
    return <QuestionMarkCircleIcon/>;
  }

  if (type === 'unavailable') {
    return <XCircleIcon/>;
  }

  console.error(`Unhandled berry favorite type [${type satisfies never}]`);
};

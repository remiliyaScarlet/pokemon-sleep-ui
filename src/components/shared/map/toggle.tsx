import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes} from '@/styles/image';


type Props = {
  mapId: string | number,
  isActive: boolean,
  onClick: () => void,
  className?: string,
};

export const MapToggle = ({mapId, isActive, onClick, className}: Props) => {
  const t = useTranslations('Game.Field');

  const mapName = t(mapId.toString());

  return (
    <button onClick={onClick} className={clsx(
      'button-base group relative', getToggleButtonClass(isActive), className,
    )}>
      <NextImage
        src={`/images/field/${mapId}.png`} alt={mapName}
        sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
      />
      <Flex direction="row" center className="absolute left-0 top-0 z-10 h-full gap-1 p-1">
        {isActive && <div className="h-6 w-6"><CheckCircleIcon/></div>}
        {mapName}
      </Flex>
    </button>
  );
};

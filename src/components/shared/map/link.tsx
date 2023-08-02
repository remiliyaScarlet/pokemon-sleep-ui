import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes} from '@/styles/image';
import {classNames} from '@/utils/react';


type Props = {
  mapId: string | number,
  className?: string,
};

export const MapLink = ({mapId, className, children}: React.PropsWithChildren<Props>) => {
  const t = useTranslations('Game.Field');

  const mapName = t(mapId.toString());

  return (
    <Link href={`/map/${mapId}`} className={classNames('button-clickable-bg group relative', className)}>
      <NextImage
        src={`/images/field/${mapId}.png`} alt={mapName}
        sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
      />
      <Flex direction="col" center className="absolute left-0 top-0 z-10 h-full gap-1">
        {children}
      </Flex>
    </Link>
  );
};

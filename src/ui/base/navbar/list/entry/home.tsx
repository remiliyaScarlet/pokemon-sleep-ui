import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';


export const NavListHome = () => {
  const t = useTranslations('UI.Metadata');

  const rankBallId = Date.now() % 4 + 1;

  return (
    <Link href="/" className={clsx(
      'button-clickable-bg flex flex-col items-center justify-center gap-1 rounded-lg p-2',
    )}>
      <div className="relative h-10 w-10">
        <NextImage src={`/images/rank/${rankBallId}.png`} alt={t('Home.Title')} sizes={imageSmallIconSizes}/>
      </div>
      <div className="text-center">
        {t('Site.Name')}
      </div>
    </Link>
  );
};

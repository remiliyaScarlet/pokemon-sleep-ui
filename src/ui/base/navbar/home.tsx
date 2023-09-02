import React from 'react';

import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';


export const NavHomepage = () => {
  const t = useTranslations('UI.Metadata');

  const rankBallId = Date.now() % 4 + 1;

  return (
    <Link href="/" className={clsx(
      'transform-smooth nav-height sticky left-0 flex flex-row items-center gap-1 rounded-lg px-1.5',
      'button-clickable-bg',
    )}>
      <div className="nav-height relative w-8">
        <NextImage src={`/images/rank/${rankBallId}.png`} alt={t('Home.Title')} sizes={imageSmallIconSizes}/>
      </div>
      <div className="whitespace-nowrap">
        <span className="hidden md:block">{t('Site.Name')}</span>
        <span className="block md:hidden">
          <div className="h-6 w-6">
            <HomeIcon/>
          </div>
        </span>
      </div>
    </Link>
  );
};

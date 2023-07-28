import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {imageSmallIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';

import styles from './main.module.css';


export const NavHomepage = () => {
  const t = useTranslations('UI.Metadata');

  const rankBallId = Date.now() % 4 + 1;

  return (
    <li className={styles['nav-height']}>
      <Link href="/" className={classNames(
        'transform-smooth',
        'flex flex-row items-center gap-1 px-1.5',
        'rounded-lg text-slate-950 hover:bg-slate-400/30 dark:text-slate-200',
      )}>
        <div className={classNames(styles['nav-height'], 'w-8 relative')}>
          <Image src={`/images/rank/${rankBallId}.png`} alt={t('Home.Title')} fill sizes={imageSmallIconSizes}/>
        </div>
        <div>
          <span className="hidden md:block">{t('SiteName')}</span>
          <span className="block md:hidden">{t('Home.Title')}</span>
        </div>
      </Link>
    </li>
  );
};

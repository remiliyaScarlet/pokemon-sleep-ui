import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {smoothTransform} from '@/styles/classes';
import {navItemHeightClass} from '@/ui/base/navbar/styles';
import {classNames} from '@/utils/react';


export const NavHomepage = () => {
  const t = useTranslations('UI.Metadata');

  return (
    <li className={navItemHeightClass}>
      <Link href="/" className={classNames(
        smoothTransform,
        'flex flex-row items-center gap-1 px-1.5',
        'rounded-lg text-slate-950 hover:bg-slate-400/30 dark:text-slate-200',
      )}>
        <div className={classNames(navItemHeightClass, 'w-8 relative')}>
          <Image src="/images/rank/3.png" alt={t('Home.Title')} fill sizes="(max-width: 768px) 20vw, 10vw"/>
        </div>
        <div>
          {t('Home.Title')}
        </div>
      </Link>
    </li>
  );
};

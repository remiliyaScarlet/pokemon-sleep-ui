'use client';
import React from 'react';

import {usePathname} from 'next-intl/client';
import Link from 'next-intl/link';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {NavEntry} from '@/types/nav';
import {classNames} from '@/utils/react';

import styles from './main.module.css';


type Props = Pick<NavEntry, 'href' | 'imageSrc' | 'disabled'> & {
  alt: string,
};

export const NavEntryUI = ({href, imageSrc, disabled, alt}: Props) => {
  const pathname = usePathname();

  const isCurrent = href === pathname;

  if (disabled) {
    return <></>;
  }

  return (
    <Link
      href={isCurrent ? {} : href}
      className={classNames(
        styles['nav-height'],
        'button-base button-text inline-block p-0.5 w-8 relative',
        isCurrent ? 'bg-slate-700/30 dark:bg-slate-300/30 cursor-auto' : 'group button-clickable',
      )}
    >
      <NextImage src={imageSrc} alt={alt} className="invert-hoverable" sizes={imageSmallIconSizes}/>
    </Link>
  );
};

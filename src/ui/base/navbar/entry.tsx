'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next-intl/client';

import {imageSmallIconSizes} from '@/styles/image';
import {NavEntry} from '@/ui/base/navbar/type';
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
        'button-base button-text inline-block p-0.5 w-8 relative group',
        isCurrent ? 'bg-slate-700/30 dark:bg-slate-300/30 cursor-auto' : 'button-clickable',
      )}
    >
      <Image src={imageSrc} alt={alt} fill className="invert-icon" sizes={imageSmallIconSizes}/>
    </Link>
  );
};

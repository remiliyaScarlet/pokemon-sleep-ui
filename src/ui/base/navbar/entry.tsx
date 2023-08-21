'use client';
import React from 'react';

import {clsx} from 'clsx';
import {usePathname} from 'next-intl/client';
import Link from 'next-intl/link';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {NavEntry} from '@/types/nav';


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
      href={isCurrent ? '#' : href}
      className={clsx(
        'nav-height button-base button-text relative inline-block w-8 p-0.5',
        isCurrent ? 'cursor-auto bg-slate-700/30 dark:bg-slate-300/30' : 'button-clickable group',
      )}
    >
      <NextImage
        src={imageSrc} alt={alt} sizes={imageSmallIconSizes}
        className="invert-hoverable transform-smooth group-hover:scale-120 motion-reduce:transform-none"
      />
    </Link>
  );
};

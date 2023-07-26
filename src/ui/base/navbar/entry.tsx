'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next-intl/client';

import {buttonStyle, invertStyle, whiteHoverableClasses} from '@/styles/classes';
import {NavEntry} from '@/ui/base/navbar/type';
import {classNames} from '@/utils/react';


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
        buttonStyle.base,
        buttonStyle.text,
        'inline-block p-0.5 h-8 w-8 relative',
        isCurrent ? 'bg-slate-700/30 dark:bg-slate-300/30 cursor-auto' : whiteHoverableClasses.parent,
      )}
    >
      <Image
        src={imageSrc} alt={alt} fill className={isCurrent ? invertStyle.normal : whiteHoverableClasses.icon}
        sizes="(max-width: 768px) 20vw, 10vw"
      />
    </Link>
  );
};

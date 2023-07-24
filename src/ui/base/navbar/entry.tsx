'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {whiteHoverableClasses} from '@/styles/classes';
import {NavEntry} from '@/ui/base/navbar/type';
import {classNames} from '@/utils/react';


type Props = Pick<NavEntry, 'href' | 'imageSrc'> & {
  alt: string,
};

export const NavEntryUI = ({href, imageSrc, alt}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={classNames(
        'inline-block p-0.5 h-8 w-8 relative',
        whiteHoverableClasses.parent,
        href === pathname ? 'bg-slate-700/30 dark:bg-slate-300/30' : undefined,
      )}>
      <Image
        src={imageSrc} alt={alt} fill className={whiteHoverableClasses.icon}
        sizes="(max-width: 768px) 20vw, 10vw"
      />
    </Link>
  );
};

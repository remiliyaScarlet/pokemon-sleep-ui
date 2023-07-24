'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {NavEntry} from '@/ui/base/navbar/type';
import {classNames} from '@/utils/react';


type Props = Pick<NavEntry, 'href' | 'activeBgClassName' | 'imageSrc'> & {
  alt: string,
};

export const NavEntryUI = ({href, activeBgClassName, imageSrc, alt}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={classNames(
        'inline-block rounded-lg p-0.5 h-8 w-8 relative transform-gpu transition-colors',
        href === pathname ? activeBgClassName : 'hover:bg-gray-700 hover:text-gray-300',
      )}>
      <Image src={imageSrc} alt={alt} fill className="p-0.5"/>
    </Link>
  );
};

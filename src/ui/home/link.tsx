import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {Row} from '@/components/layout/row';
import {classNames} from '@/utils/react';


type Props = {
  href: string,
  imageSrc: string,
  text: string,
};

export const HomePageLink = ({href, imageSrc, text}: Props) => {
  return (
    <Link
      href={href}
      className={classNames(
        'group rounded-lg border border-slate-500 inline-block p-0.5 h-20 w-20 transform-gpu transition-colors',
        'hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30',
        'hover:bg-gray-700 hover:text-gray-300',
      )}>
      <Row className="flex-col">
        <div className="relative h-12 w-12">
          <Image
            src={imageSrc} alt={text} fill
            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </div>
        <div>
          {text}
        </div>
      </Row>
    </Link>
  );
};

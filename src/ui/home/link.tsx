import React from 'react';

import Image from 'next/image';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {imageSmallIconSizes} from '@/styles/image';
import {NavEntry} from '@/types/nav';
import {classNames} from '@/utils/react';

import styles from './main.module.css';


type Props = Pick<NavEntry, 'href' | 'imageSrc' | 'disabled'> & {
  text: string,
};

export const HomePageLink = ({href, imageSrc, disabled, text}: Props) => {
  if (disabled) {
    return (
      <button disabled className={classNames('button-base button-disabled', styles['home-link'])}>
        <Flex direction="row" center className="h-full gap-1.5">
          <div className="relative h-12 w-12">
            <Image src={imageSrc} alt={text} fill className="invert-on-light" sizes={imageSmallIconSizes}/>
          </div>
          <div className="text-lg">
            {text}
          </div>
        </Flex>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={classNames(
        'button-clickable group border border-slate-700 dark:border-slate-300',
        styles['home-link'],
      )}
    >
      <Flex
        direction="row" center
        className="h-full gap-1.5 transition-transform group-hover:scale-125 motion-reduce:transform-none"
      >
        <div className="relative h-12 w-12">
          <Image src={imageSrc} alt={text} fill className="invert-icon" sizes={imageSmallIconSizes}/>
        </div>
        <div className="text-lg">
          {text}
        </div>
      </Flex>
    </Link>
  );
};

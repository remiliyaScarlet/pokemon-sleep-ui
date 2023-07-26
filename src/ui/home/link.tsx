import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {Flex} from '@/components/layout/flex';
import {buttonStyle, invertStyle, whiteHoverableClasses} from '@/styles/classes';
import {NavEntry} from '@/ui/base/navbar/type';
import {classNames} from '@/utils/react';


type Props = Pick<NavEntry, 'href' | 'imageSrc' | 'disabled'> & {
  text: string,
};

export const HomePageLink = ({href, imageSrc, disabled, text}: Props) => {
  if (disabled) {
    return (
      <button
        disabled
        className={classNames(
          buttonStyle.base,
          'bg-slate-400/50 dark:bg-slate-700/50 text-slate-500/70 dark:text-slate-500',
          'inline-block p-0.5 h-32 w-full border border-slate-400/50 dark:border-slate-500',
        )}
      >
        <Flex direction="row" center className="h-full gap-1.5">
          <div className="relative h-12 w-12">
            <Image
              src={imageSrc} alt={text} fill className={invertStyle.normal}
              sizes="(max-width: 768px) 20vw, 10vw"
            />
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
        whiteHoverableClasses.parent,
        'inline-block p-0.5 h-32 w-full border border-slate-700 dark:border-slate-300',
      )}
    >
      <Flex
        direction="row" center
        className="h-full gap-1.5 transition-transform group-hover:scale-125 motion-reduce:transform-none"
      >
        <div className="relative h-12 w-12">
          <Image
            src={imageSrc} alt={text} fill className={whiteHoverableClasses.icon}
            sizes="(max-width: 768px) 20vw, 10vw"
          />
        </div>
        <div className="text-lg">
          {text}
        </div>
      </Flex>
    </Link>
  );
};

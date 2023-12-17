import React from 'react';

import {clsx} from 'clsx';


type Props = {
  percent: number,
  heightClass?: `h-${number}`,
  className?: string,
};

export const ProgressBar = ({percent, heightClass, className}: Props) => {
  heightClass ??= 'h-2.5';

  return (
    <div className={clsx(
      'transform-smooth w-full rounded-full bg-gray-400/50 dark:bg-gray-700/50',
      heightClass,
      className,
    )}>
      <div
        className={clsx('transform-smooth rounded-full bg-slate-500', heightClass)}
        style={{width: `${percent}%`}}
      />
    </div>
  );
};

import React from 'react';

import {clsx} from 'clsx';


type Props = {
  percent: number,
  className?: string,
};

export const ProgressBar = ({percent, className}: Props) => {
  return (
    <div className={clsx('transform-smooth h-2.5 w-full rounded-full bg-gray-400/50 dark:bg-gray-700/50', className)}>
      <div className="transform-smooth h-2.5 rounded-full bg-slate-500" style={{width: `${percent}%`}}/>
    </div>
  );
};

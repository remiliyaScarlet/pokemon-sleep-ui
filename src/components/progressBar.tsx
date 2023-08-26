import React from 'react';


type Props = {
  percent: number,
};

export const ProgressBar = ({percent}: Props) => {
  return (
    <div className="transform-smooth h-2.5 w-full rounded-full bg-gray-400/50 dark:bg-gray-700/50">
      <div className="transform-smooth h-2.5 rounded-full bg-slate-500" style={{width: `${percent}%`}}/>
    </div>
  );
};

import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NatureData} from '@/types/game/pokemon/nature';


const buffStyle = clsx(
  'transform-smooth text-green-800 group-enabled:group-hover:text-green-400',
  'dark:text-green-400 dark:group-enabled:group-hover:text-green-800',
);
const nerfStyle = clsx(
  'transform-smooth text-red-700 group-enabled:group-hover:text-red-400',
  'dark:text-red-400 dark:group-enabled:group-hover:text-red-700',
);
const natureStyleIfClean = clsx(
  'transform-smooth text-amber-700 group-enabled:group-hover:text-amber-400',
  'dark:text-amber-400 dark:group-enabled:group-hover:text-amber-700',
);

type Props = {
  data: NatureData | null,
  active: boolean,
  onClick: () => void,
};

export const PokemonNatureSelectorButton = ({data, active, onClick}: Props) => {
  const t = useTranslations('Game');

  return (
    <button onClick={onClick} disabled={active} className={clsx(
      'width-with-gap sm:width-with-gap-2-items group rounded-lg',
      'enabled:button-clickable-border disabled:button-bg',
    )}>
      <Flex direction="col" center className="p-2">
        <div className={!data?.buff || !data?.nerf ? natureStyleIfClean : ''}>
          {data ? t(`Nature.${data.id}`) : <div className="h-6 w-6"><XCircleIcon/></div>}
        </div>
        <Flex direction="row" className="text-sm">
          <Flex direction="row" center className={clsx('gap-0.5', data?.buff && buffStyle)}>
            <div className="h-5 w-5">
              <ChevronUpIcon/>
            </div>
            <div className="whitespace-nowrap">
              {data?.buff ? t(`NatureEffect.${data.buff}`) : <div className="h-4 w-4"><XCircleIcon/></div>}
            </div>
          </Flex>
          <Flex direction="row" center className={clsx('gap-0.5', data?.nerf && nerfStyle)}>
            <div className="h-5 w-5">
              <ChevronDownIcon/>
            </div>
            <div className="whitespace-nowrap">
              {data?.nerf ? t(`NatureEffect.${data.nerf}`) : <div className="h-4 w-4"><XCircleIcon/></div>}
            </div>
          </Flex>
        </Flex>
      </Flex>
    </button>
  );
};

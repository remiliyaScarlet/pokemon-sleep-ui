import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NatureData} from '@/types/game/producing/nature';


type Props = {
  data: NatureData | null,
  onClick: () => void,
};

export const TeamAnalysisNatureButton = ({data, onClick}: Props) => {
  const t = useTranslations('Game');

  return (
    <button
      key={data?.id} onClick={onClick}
      className="button-clickable-border width-with-gap sm:width-with-gap-2-items"
    >
      {data ?
        <Flex direction="col" center className="justify-center p-2">
          <div>
            {t(`Nature.${data.id}`)}
          </div>
          <Flex direction="row" className="text-sm">
            <Flex direction="row" center>
              <div className="h-5 w-5">
                <ChevronUpIcon/>
              </div>
              <div className="whitespace-nowrap">
                {data.buff ? t(`NatureEffect.${data.buff}`) : <div className="h-4 w-4"><XCircleIcon/></div>}
              </div>
            </Flex>
            <Flex direction="row" center>
              <div className="h-5 w-5">
                <ChevronDownIcon/>
              </div>
              <div className="whitespace-nowrap">
                {data.nerf ? t(`NatureEffect.${data.nerf}`) : <div className="h-4 w-4"><XCircleIcon/></div>}
              </div>
            </Flex>
          </Flex>
        </Flex> :
        <div className="h-4 w-4">
          <XCircleIcon/>
        </div>
      }
    </button>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {imagePortraitSizes} from '@/styles/image';
import {BerryPageCommonProps} from '@/ui/berry/page/type';
import {formatInt} from '@/utils/number';


export const BerryMeta = ({berryData}: BerryPageCommonProps) => {
  const {id, energy} = berryData;

  const t = useTranslations('Game.Berry');
  const t2 = useTranslations('UI.InPage.Berry');

  const berryName = t(id.toString());
  const berryEnergyArray = energy.map(({energy}) => energy);

  return (
    <Flex direction="col" center className="info-section-md-fit">
      <div className="text-xl">
        {berryName}
      </div>
      <div className="relative h-44 w-44 rounded-lg border border-slate-300 dark:border-slate-700">
        <NextImage src={`/images/berry/${id}.png`} alt={berryName} sizes={imagePortraitSizes}/>
      </div>
      <Flex direction="row" center className="gap-1 text-xl">
        <ColoredEnergyIcon alt={t2('Energy')}/>
        <div>
          {formatInt(Math.min(...berryEnergyArray))} ~ {formatInt(Math.max(...berryEnergyArray))}
        </div>
      </Flex>
    </Flex>
  );
};

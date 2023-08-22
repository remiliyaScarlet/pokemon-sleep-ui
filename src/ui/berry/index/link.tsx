import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryData} from '@/types/game/berry';
import {formatInt} from '@/utils/number';


type Props = {
  berryData: BerryData,
};

export const BerryLink = ({berryData}: Props) => {
  const {id} = berryData;

  const t = useTranslations('Game.Berry');
  const t2 = useTranslations('Game.PokemonType');
  const t3 = useTranslations('UI.InPage.Berry');

  const berryName = t(id.toString());
  const berryEnergyArray = berryData.energy.map(({energy}) => energy);

  return (
    <Link href={`/berry/${id}`} className="w-full">
      <Flex key={id} direction="col" center className="button-clickable-bg gap-0.5 p-1">
        <Flex direction="col" center className="relative">
          <div className="absolute bottom-0 right-1">
            <div className="relative h-8 w-8">
              <NextImage src={`/images/type/${id}.png`} alt={t2(id.toString())} sizes={imageSmallIconSizes}/>
            </div>
          </div>
          <div className="relative h-12 w-12">
            <NextImage src={`/images/berry/${id}.png`} alt={berryName} sizes={imageSmallIconSizes}/>
          </div>
        </Flex>
        <div className="whitespace-nowrap p-1">
          {berryName}
        </div>
        <Flex direction="row" center className="gap-1">
          <ColoredEnergyIcon alt={t3('Energy')}/>
          <div>
            {formatInt(Math.min(...berryEnergyArray))} ~ {formatInt(Math.max(...berryEnergyArray))}
          </div>
        </Flex>
      </Flex>
    </Link>
  );
};

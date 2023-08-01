'use client';
import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {getPokemonBerryProductionRate, GetPokemonBerryProductionRateOpts} from '@/utils/game/pokemon';


type Props = Omit<GetPokemonBerryProductionRateOpts, 'level'>;

export const PokemonBerryEnergy = (props: Props) => {
  const {berryData} = props;
  const [level, setLevel] = React.useState(1);

  const t = useTranslations('UI.InPage.Pokedex');

  const atLevel = getPokemonBerryProductionRate({level, ...props});

  return (
    <Flex direction="col" className="gap-1">
      <Flex direction="row" className="gap-1">
        <div className="whitespace-nowrap">
          {t('Info.PokemonLevel')}
        </div>
        <div>
          {level}
        </div>
      </Flex>
      <Slider
        id="BerryEnergy"
        value={level}
        setValue={setLevel}
        min={1}
        max={berryData.energy.length}
      />
      <Flex direction="row" className="ml-auto items-center justify-end gap-1">
        <div className="relative h-4 w-4">
          <Image src="/images/generic/energy.png" alt={t('Stats.Energy.Name')} fill sizes={imageIconSizes}/>
        </div>
        <div className="text-sm">
          {t('Stats.Energy.Daily')}
        </div>
        <div className="text-sm">
          {atLevel.daily.toFixed(2)}
        </div>
        <div className="text-sm">
          {t('Stats.Energy.Weekly')}
        </div>
        <div className="text-sm">
          {atLevel.weekly.toFixed(2)}
        </div>
      </Flex>
    </Flex>
  );
};

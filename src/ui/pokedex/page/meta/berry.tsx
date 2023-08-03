'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {PokemonProductionRate} from '@/components/shared/pokemon/productionRate';
import {getPokemonBerryProductionRate, GetPokemonBerryProductionRateOpts} from '@/utils/game/pokemon';


type Props = Omit<GetPokemonBerryProductionRateOpts, 'level'>;

export const PokemonBerryMeta = (props: Props) => {
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
      <PokemonProductionRate dailyRate={atLevel.dailyEnergy}/>
    </Flex>
  );
};

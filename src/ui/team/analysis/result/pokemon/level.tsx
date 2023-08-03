import React from 'react';

import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';


type Props = {
  level: number,
  setLevel: (newLevel: number) => void,
  maxLevel: number,
};

export const TeamAnalysisPokemonLevel = ({level, setLevel, maxLevel}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="gap-1 py-2 text-sm">
      <Flex direction="row" className="gap-1">
        <div className="whitespace-nowrap">
          {t('PokemonLevel')}
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
        max={maxLevel}
      />
    </Flex>
  );
};

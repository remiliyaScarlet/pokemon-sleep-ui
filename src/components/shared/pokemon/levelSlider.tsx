import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';


type Props = {
  level: number,
  maxLevel: number,
  setLevel: (level: number) => void,
  noSameLine?: boolean,
};

export const PokemonLevelSlider = ({level, maxLevel, setLevel, noSameLine}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className={clsx('items-center gap-1.5', !noSameLine && 'lg:flex-row')}>
      <Flex direction="row" noFullWidth className={clsx(
        'gap-1.5 self-end', !noSameLine && 'lg:mr-auto lg:self-auto',
      )}>
        <div className="whitespace-nowrap">
          {t('PokemonLevel')}
        </div>
        <div>
          {level}
        </div>
      </Flex>
      <Slider id="PokemonLevel" value={level} setValue={setLevel} min={1} max={maxLevel}/>
    </Flex>
  );
};

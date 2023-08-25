import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';


type Props = {
  level: number,
  maxLevel: number,
  setLevel: (level: number) => void,
  noSameLine?: boolean,
  minLevel?: number,
};

export const PokemonLevelSlider = ({level, minLevel = 1, maxLevel, setLevel, noSameLine}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className={clsx('items-center gap-1.5', !noSameLine && 'lg:flex-row')}>
      <Flex direction="row" noFullWidth className={clsx(
        'gap-1.5 self-end', !noSameLine && 'lg:mr-auto lg:self-auto',
      )}>
        <div className="whitespace-nowrap">
          {t('PokemonLevel')}
        </div>
        <InputBox
          value={level.toString()}
          type="number"
          className="w-12 text-center"
          onChange={({target}) => {
            const level = parseInt(target.value || '0');

            if (isNaN(level)) {
              return;
            }

            setLevel(Math.min(level, maxLevel));
          }}
        />
      </Flex>
      <Slider id="PokemonLevel" value={level} setValue={setLevel} min={minLevel} max={maxLevel}/>
    </Flex>
  );
};

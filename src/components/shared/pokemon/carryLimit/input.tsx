import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {maxCarryLimit} from '@/ui/team/pokebox/editor/const';


type Props = {
  carryLimit: number,
  defaultCarryLimit: number,
  setCarryLimit: (carryLimit: number) => void,
};

export const PokemonCarryLimitInput = ({carryLimit, defaultCarryLimit, setCarryLimit}: Props) => {
  const t = useTranslations('UI.Common');

  return (
    <Flex direction="row" className="items-center justify-end gap-0.5">
      <PokemonDataIcon src="/images/generic/bag.png" alt={t('MaxCarry')} invert/>
      <InputBox
        type="number"
        value={carryLimit.toString()}
        className="w-20 text-center"
        onChange={({target}) => {
          const carryLimit = parseInt(target.value);

          setCarryLimit(isNaN(carryLimit) ? 0 : Math.min(carryLimit, maxCarryLimit));
        }}
      />
      <button className="button-clickable-bg !rounded-full p-1" onClick={() => setCarryLimit(defaultCarryLimit)}>
        <div className="h-5 w-5">
          <ArrowPathIcon/>
        </div>
      </button>
    </Flex>
  );
};

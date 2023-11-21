import React from 'react';

import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {UserCalculationBehavior} from '@/types/userData/settings';


type Props = {
  behavior: UserCalculationBehavior,
  setBehavior: (updated: UserCalculationBehavior) => void,
};

export const UserCalculationBehaviorUI = ({behavior, setBehavior}: Props) => {
  const {
    alwaysFullPack,
    goodCampTicket,
    includeMainSkill,
  } = behavior;

  const t = useTranslations('UI.UserSettings');

  const isAlwaysFullPack = alwaysFullPack === 'berryOnly';

  return (
    <InputRow>
      <ToggleButton
        active={isAlwaysFullPack}
        onClick={() => setBehavior({
          ...behavior,
          alwaysFullPack: !isAlwaysFullPack ? 'berryOnly' : 'disable',
        })}
        className={getTextFilterButtonClass(isAlwaysFullPack)}
      >
        {t('BerryPokemonFullPack')}
      </ToggleButton>
      <ToggleButton
        active={goodCampTicket}
        onClick={() => setBehavior({
          ...behavior,
          goodCampTicket: !goodCampTicket,
        })}
        className={getTextFilterButtonClass(goodCampTicket)}
      >
        {t('GoodCampTicket')}
      </ToggleButton>
      <ToggleButton
        active={includeMainSkill}
        onClick={() => setBehavior({
          ...behavior,
          includeMainSkill: !includeMainSkill,
        })}
        className={getTextFilterButtonClass(includeMainSkill)}
      >
        {t('IncludeMainSkill')}
      </ToggleButton>
    </InputRow>
  );
};

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
        id="berryMonFullPack"
        active={isAlwaysFullPack}
        onChange={(alwaysFullPack) => setBehavior({
          ...behavior,
          alwaysFullPack: alwaysFullPack ? 'berryOnly' : 'disable',
        })}
        className={getTextFilterButtonClass(isAlwaysFullPack)}
      >
        {t('BerryPokemonFullPack')}
      </ToggleButton>
      <ToggleButton
        id="goodCampTicket"
        active={goodCampTicket}
        onChange={(goodCampTicket) => setBehavior({
          ...behavior,
          goodCampTicket,
        })}
        className={getTextFilterButtonClass(goodCampTicket)}
      >
        {t('GoodCampTicket')}
      </ToggleButton>
      <ToggleButton
        id="includeMainSkill"
        active={includeMainSkill}
        onChange={(includeMainSkill) => setBehavior({
          ...behavior,
          includeMainSkill,
        })}
        className={getTextFilterButtonClass(includeMainSkill)}
      >
        {t('IncludeMainSkill')}
      </ToggleButton>
    </InputRow>
  );
};

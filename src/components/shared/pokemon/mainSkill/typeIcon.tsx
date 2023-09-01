import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {mainSkillEffectTypeI18nId, mainSkillEffectTypeImageSrc} from '@/const/game/mainSkill';
import {MainSkillEffectType} from '@/types/game/pokemon/mainSkill';
import {Dimension} from '@/types/style';


type Props = {
  type: MainSkillEffectType,
  dimension?: Dimension,
};

export const MainSkillEffectTypeIcon = ({type, dimension}: Props) => {
  const t = useTranslations('UI.MainSkill.EffectType');

  return (
    <PokemonDataIcon
      src={mainSkillEffectTypeImageSrc[type]}
      alt={t(mainSkillEffectTypeI18nId[type])}
      dimension={dimension}
      invert
    />
  );
};

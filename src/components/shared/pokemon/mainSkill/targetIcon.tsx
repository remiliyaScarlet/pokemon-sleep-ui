import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {mainSkillEffectTargetI18nId, mainSkillEffectTargetImageSrc} from '@/const/game/mainSkill';
import {MainSkillTarget} from '@/types/game/pokemon/mainSkill';


type Props = {
  target: MainSkillTarget,
};

export const MainSkillTargetIcon = ({target}: Props) => {
  const t = useTranslations('UI.MainSkill.Target');

  return (
    <PokemonDataIcon
      src={mainSkillEffectTargetImageSrc[target]}
      alt={t(mainSkillEffectTargetI18nId[target])}
      invert
    />
  );
};

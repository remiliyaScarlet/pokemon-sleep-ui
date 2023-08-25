import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {subSkillBonusImageSrcMap} from '@/const/game/pokemon';
import {subSkillRarityIconFilter} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {SubSkillBonusCategory, SubSkillData} from '@/types/game/pokemon/subskill';


type Props = {
  subSkill: SubSkillData | undefined,
};

export const PokemonSubSkillIcon = ({subSkill}: Props) => {
  const t = useTranslations('Game');

  if (!subSkill) {
    return (
      <div className="h-5 w-5">
        <XCircleIcon/>
      </div>
    );
  }

  const firstEffectiveBonus = Object.entries(subSkill?.bonus ?? {})
    .filter(([_, value]) => value != 0)
    .map(([key]) => key as SubSkillBonusCategory)
    .at(0);

  if (!firstEffectiveBonus) {
    return (
      <div className="relative h-5 w-5">
        <QuestionMarkCircleIcon/>
      </div>
    );
  }

  return (
    <div className={clsx('relative h-6 w-6', subSkill.rarity && subSkillRarityIconFilter[subSkill.rarity])}>
      <NextImage
        src={subSkillBonusImageSrcMap[firstEffectiveBonus]}
        alt={t(`SubSkill.Name.${subSkill?.id}`)}
        sizes={imageSmallIconSizes}
      />
    </div>
  );
};

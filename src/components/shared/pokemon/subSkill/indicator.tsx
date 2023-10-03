import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSubSkillIcon} from '@/components/shared/pokemon/subSkill/icon';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonSubSkill, pokemonSubSkillLevel, SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props = {
  subSkill: PokemonSubSkill,
  subSkillMap: SubSkillMap,
};

export const PokemonSubSkillIndicator = ({subSkill, subSkillMap}: Props) => {
  const t = useTranslations('UI.InPage.Team');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 p-0.5">
      <div className="relative h-5 w-5">
        <NextImage
          src="/images/generic/subSkill.png" alt={t('SubSkill')}
          sizes={imageSmallIconSizes} className="invert-hoverable"
        />
      </div>
      <Flex direction="row" noFullWidth className="items-center">
        {pokemonSubSkillLevel.map((level) => {
          const subSkillId = subSkill[level];

          return (
            <PokemonSubSkillIcon key={level} subSkill={subSkillId ? subSkillMap[subSkillId] : undefined}/>
          );
        })}
      </Flex>
    </Flex>
  );
};

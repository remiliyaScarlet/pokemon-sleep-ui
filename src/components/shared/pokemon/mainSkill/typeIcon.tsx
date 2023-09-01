import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {mainSkillEffectTypeI18nId} from '@/const/game/mainSkill';
import {MainSkillEffectType} from '@/types/game/pokemon/mainSkill';


type Props = {
  type: MainSkillEffectType,
};

export const MainSkillEffectTypeIcon = ({type}: Props) => {
  const t = useTranslations('UI.MainSkill.EffectType');

  const props = {
    alt: t(mainSkillEffectTypeI18nId[type]),
    invert: true,
  };

  if (type === 'strength') {
    return <PokemonDataIcon src="/images/generic/energy_white.png" {...props}/>;
  }

  if (type === 'shards') {
    return <PokemonDataIcon src="/images/generic/shard_white.png" {...props}/>;
  }

  if (type === 'stamina') {
    return <PokemonDataIcon src="/images/generic/mood.png" {...props}/>;
  }

  if (type === 'help') {
    return <PokemonDataIcon src="/images/generic/speed.png" {...props}/>;
  }

  if (type === 'cooking') {
    return <PokemonDataIcon src="/images/generic/pot.png" {...props}/>;
  }

  if (type === 'random') {
    return <PokemonDataIcon src="/images/generic/flash.png" {...props}/>;
  }

  console.error(`Unhandled main skill effect type [${type satisfies never}]`);
};

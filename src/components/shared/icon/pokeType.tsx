import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {PokemonTypeId} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  type: PokemonTypeId,
  dimension: Dimension,
};

export const PokemonTypeIcon = ({type, dimension}: Props) => {
  const t = useTranslations('Game');

  return (
    <GenericIcon
      alt={t(`PokemonType.${type}`)}
      src={`/images/type/${type}.png`}
      dimension={dimension}
      noInvert
      noShrink
      className="rounded-full bg-slate-700/70"
    />
  );
};

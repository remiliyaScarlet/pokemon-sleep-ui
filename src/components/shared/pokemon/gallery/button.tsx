import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {useSleepStyleName} from '@/hooks/sleepdex/name';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {Nullable} from '@/utils/type';


type Props = {
  pokemonId: PokemonId,
  pokemonBranch: Nullable<PokemonBranchData>,
  image: PokemonImageType,
  isActive: boolean,
};

export const PokemonGalleryButton = ({pokemonId, pokemonBranch, image, isActive}: Props) => {
  const t = useTranslations('Game.PokemonName');
  const sleepStyleName = useSleepStyleName({
    pokemonId,
    pokemonBranch,
    sleepStyleId: image === 'portrait' || image === 'icon' ? null : image,
  });

  if (image === 'portrait' || image === 'icon') {
    return <GenericPokeballIcon alt={t(pokemonId.toString())} isActive={isActive}/>;
  }

  return sleepStyleName;
};

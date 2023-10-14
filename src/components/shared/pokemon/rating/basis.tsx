import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {ratingBasisI18nId, ratingBasisSpecialty} from '@/const/game/rating';
import {RatingBasis} from '@/types/game/pokemon/rating';


type Props = {
  basis: RatingBasis,
  isActive?: boolean,
};

export const RatingBasisUI = ({basis, isActive}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" center className="gap-1">
      {ratingBasisSpecialty[basis].map((specialty) => (
        <PokemonSpecialtyIcon key={specialty} specialty={specialty} active={isActive}/>
      ))}
      {t(ratingBasisI18nId[basis])}
    </Flex>
  );
};

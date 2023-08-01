import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconListDuplicable} from '@/components/shared/pokemon/iconListDuplicable';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/mongo/pokemon';


type Props = {
  data: PokemonInfo[],
  specialty: PokemonSpecialtyId,
};

export const PokemonIconListMarkSpecialty = ({data, specialty: targetSpecialty}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <PokemonIconListDuplicable
      dataWithPokemonId={data}
      getPokemonId={({id}) => id}
      getInfo={({specialty}) => (
        specialty === targetSpecialty ?
          <div className="relative h-4 w-4">
            <NextImage
              src="/images/generic/flash.png" alt={t('Specialty')}
              sizes={imageSmallIconSizes} className="invert-on-light"
            />
          </div> :
          undefined
      )}
    />
  );
};

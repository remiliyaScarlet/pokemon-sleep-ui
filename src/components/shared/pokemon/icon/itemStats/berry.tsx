import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats/item';
import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryDataMap} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';


type Props = PokemonBerryStatsCommonProps & {
  level: number,
  bonus: EffectiveBonus,
  berryDataMap: BerryDataMap,
};

export const PokemonIconsBerryStats = ({
  pokemonOfBerry,
  ...props
}: Props) => {
  const t = useTranslations('Game');

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.berry}
      getItemRate={({berry}) => berry}
      getIcon={({berry}) => (
        <NextImage
          src={`/images/berry/${berry.id}.png`}
          alt={t(`Berry.${berry.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      {...props}
    />
  );
};

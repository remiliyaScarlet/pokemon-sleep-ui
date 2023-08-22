import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryData, BerryDataMap} from '@/types/game/berry';
import {PokemonInfo} from '@/types/game/pokemon';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';


type Props = {
  data: PokemonInfo[],
  level: number,
} & ({
  berryData: BerryData,
  berryDataMap?: never,
} | {
  berryData?: never,
  berryDataMap: BerryDataMap,
});

export const PokemonIconsBerryStats = ({data, level, berryData, berryDataMap}: Props) => {
  const t = useTranslations('Game');

  return (
    <PokemonIconsItemStats
      data={data}
      getProducingRate={(pokemon) => {
        let berryDataToUse = null;
        if (pokemon.berry.id === berryData?.id) {
          berryDataToUse = berryData;
        } else if (berryDataMap && berryDataMap[pokemon.berry.id]) {
          berryDataToUse = berryDataMap[pokemon.berry.id];
        }

        if (!berryDataToUse) {
          return null;
        }

        return getBerryProducingRate({
          level,
          pokemon,
          ...defaultNeutralOpts,
          snorlaxFavorite: {},
          berryData: berryDataToUse,
        });
      }}
      getIcon={({berry}) => (
        <NextImage
          src={`/images/berry/${berry.id}.png`}
          alt={t(`Berry.${berry.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      targetSpecialty={specialtyIdMap.berry}
    />
  );
};

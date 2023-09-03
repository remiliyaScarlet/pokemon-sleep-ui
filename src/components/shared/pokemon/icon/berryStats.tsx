import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryData, BerryDataMap} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';


type Props = PokemonBerryStatsCommonProps & {
  level: number,
  bonus: EffectiveBonus,
} & ({
  berryData: BerryData,
  berryDataMap?: never,
} | {
  berryData?: never,
  berryDataMap: BerryDataMap,
});

export const PokemonIconsBerryStats = ({pokedex, pokemonOfBerry, level, bonus, berryData, berryDataMap}: Props) => {
  const t = useTranslations('Game');

  return (
    <PokemonIconsItemStats
      pokedex={pokedex}
      targetSpecialty={specialtyIdMap.berry}
      dropData={pokemonOfBerry.map(({id, berry}) => ({
        pokemon: id,
        qty: berry.quantity,
      }))}
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
          bonus,
          snorlaxFavorite: {},
          berryData: berryDataToUse,
          ...defaultNeutralOpts,
        });
      }}
      getIcon={({berry}) => (
        <NextImage
          src={`/images/berry/${berry.id}.png`}
          alt={t(`Berry.${berry.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
    />
  );
};

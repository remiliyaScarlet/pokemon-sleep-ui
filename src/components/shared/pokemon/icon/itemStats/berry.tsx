import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats/fromPokedex';
import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {BerryData, BerryDataMap} from '@/types/game/berry';


type Props = PokemonBerryStatsCommonProps & {
  level: number,
  berryData: BerryData,
  berryDataMap: BerryDataMap,
};

export const PokemonIconsBerryStats = ({
  pokemonOfBerry,
  berryData,
  ...props
}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.berry}
      getItemRate={({berry}) => berry}
      getIcon={({berry}, dimension) => (
        <PokemonBerryIcon id={berry.id} dimension={dimension}/>
      )}
      itemAlt={t('Berry')}
      itemImageSrc={`/images/berry/${berryData.id}.png`}
      {...props}
    />
  );
};

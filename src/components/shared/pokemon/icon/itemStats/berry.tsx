import React from 'react';

import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats/item';
import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {BerryDataMap} from '@/types/game/berry';


type Props = PokemonBerryStatsCommonProps & {
  level: number,
  berryDataMap: BerryDataMap,
};

export const PokemonIconsBerryStats = ({
  pokemonOfBerry,
  ...props
}: Props) => {
  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.berry}
      getItemRate={({berry}) => berry}
      getIcon={({berry}, dimension) => (
        <PokemonBerryIcon id={berry.id} dimension={dimension}/>
      )}
      {...props}
    />
  );
};

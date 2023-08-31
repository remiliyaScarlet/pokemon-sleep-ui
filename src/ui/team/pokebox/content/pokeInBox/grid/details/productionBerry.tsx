import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {getRateOfBerry} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat} from '@/utils/number';


export const PokeInBoxProductionBerry = (props: PokeInBoxCommonProps) => {
  const {pokemon} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfBerry = getRateOfBerry(props);

  return (
    <Flex direction="row" className={clsx(
      'items-center gap-1 p-0',
      pokemon.specialty === specialtyIdMap.berry && 'bg-blink',
    )}>
      <PokemonBerryIcon id={pokemon.berry.id}/>
      <div>
        x{formatFloat(rateOfBerry.quantity)}
      </div>
      <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
      <div>
        {formatFloat(rateOfBerry.dailyEnergy)}
      </div>
    </Flex>
  );
};

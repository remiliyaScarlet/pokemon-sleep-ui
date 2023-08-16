import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {getRateOfBerry} from '@/ui/team/pokebox/content/details/utils';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat} from '@/utils/number';


export const PokeboxPokeInBoxProductionBerry = (props: PokeboxPokeInBoxCommonProps) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfBerry = getRateOfBerry(props);

  return (
    <Flex direction="row" className="items-center gap-0.5">
      <PokemonBerryIcon id={props.pokemon.berry.id}/>
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

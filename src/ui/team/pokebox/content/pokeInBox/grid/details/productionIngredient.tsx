import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat} from '@/utils/number';


export const PokeInBoxProductionIngredient = (props: PokeInBoxCommonProps) => {
  const {pokemon} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <Flex direction="col" noFullWidth className={clsx(
      'gap-0.5 text-sm',
      pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
    )}>
      {rateOfIngredients.map(({id, quantity, dailyEnergy}) => (
        <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
          <PokemonIngredientIcon id={id}/>
          <div>
            x{formatFloat(quantity)}
          </div>
          <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(dailyEnergy)}
          </div>
        </Flex>
      ))}
    </Flex>
  );
};

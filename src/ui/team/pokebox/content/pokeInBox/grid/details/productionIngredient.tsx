import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat} from '@/utils/number';


export const PokeInBoxGridProductionIngredient = (props: PokeInBoxCommonProps) => {
  const {pokemon} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  const {ingredient} = getRateOfPokemon(props);

  return (
    <Flex noFullWidth className={clsx(
      'w-fit gap-0.5 pr-1.5 text-sm',
      pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
    )}>
      {Object.values(ingredient).map(({id, quantity, dailyEnergy}) => (
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

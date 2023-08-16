import React from 'react';

import {clsx} from 'clsx';
import sum from 'lodash/sum';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {getRateOfIngredients} from '@/ui/team/pokebox/content/details/utils';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat} from '@/utils/number';


export const PokeboxPokeInBoxProductionIngredient = (props: PokeboxPokeInBoxCommonProps) => {
  const {pokemon} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <Flex direction="col" noFullWidth className={clsx(
      pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
      'gap-0.5 text-sm',
    )}>
      {Object.entries(rateOfIngredients).map(([id, rates]) => (
        <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
          <PokemonIngredientIcon id={parseInt(id)}/>
          <div>
            x{formatFloat(sum(rates.map(({quantity}) => quantity)))}
          </div>
          <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(sum(rates.map(({dailyEnergy}) => dailyEnergy)))}
          </div>
        </Flex>
      ))}
    </Flex>
  );
};

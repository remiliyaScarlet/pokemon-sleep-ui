import React from 'react';

import sum from 'lodash/sum';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {getRateOfIngredients} from '@/ui/team/pokebox/content/details/utils';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat} from '@/utils/number';


export const PokeboxPokeInBoxProductionIngredient = (props: PokeboxPokeInBoxCommonProps) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <Flex direction="col" className="gap-0.5 text-sm">
      {Object.entries(rateOfIngredients).map(([id, rates]) => (
        <Flex key={id} direction="row" className="items-center gap-0.5">
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

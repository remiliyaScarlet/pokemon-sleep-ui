import React from 'react';

import sum from 'lodash/sum';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/details/utils';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat} from '@/utils/number';


export const PokeboxPokeInBoxProductionTotal = (props: PokeboxPokeInBoxCommonProps) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfBerry = getRateOfBerry(props);
  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <Flex direction="col" className="gap-1">
      <Flex direction="row" className="items-center gap-0.5 text-sm">
        <PokemonBerryIcon id={props.pokemon.berry.id}/>
        <div>
          x{formatFloat(rateOfBerry.quantity)}
        </div>
        {Object.entries(rateOfIngredients).map(([id, rates]) => (
          <React.Fragment key={id}>
            <PokemonIngredientIcon id={parseInt(id)}/>
            <div>
              x{formatFloat(sum(rates.map(({quantity}) => quantity)))}
            </div>
          </React.Fragment>
        ))}
      </Flex>
      <Flex direction="row" className="items-center gap-0.5 text-lg">
        <ColoredEnergyIcon dimension="h-6 w-6" alt={t('Stats.Energy.Name')}/>
        <div>
          {formatFloat(
            rateOfBerry.dailyEnergy +
            sum(Object.values(rateOfIngredients)
              .flatMap((rates) => rates).map(({dailyEnergy}) => dailyEnergy),
            ))}
        </div>
      </Flex>
    </Flex>
  );
};

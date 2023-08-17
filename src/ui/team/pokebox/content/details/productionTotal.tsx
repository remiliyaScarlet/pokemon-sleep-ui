import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/details/utils';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number';


export const PokeboxPokeInBoxProductionTotal = (props: PokeboxPokeInBoxCommonProps) => {
  const {pokemon} = props;

  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfBerry = getRateOfBerry(props);
  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <Flex direction="col" className="gap-1">
      <Flex direction="row" className="items-center gap-0.5 text-sm">
        <Flex direction="row" noFullWidth className={clsx(
          'items-center gap-0.5 px-1',
          pokemon.specialty === specialtyIdMap.berry && 'bg-blink',
        )}>
          <PokemonBerryIcon id={pokemon.berry.id}/>
          <div>
            x{formatFloat(rateOfBerry.quantity)}
          </div>
        </Flex>
        <Flex direction="row" noFullWidth className={clsx(
          'items-center gap-0.5 px-1',
          pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
        )}>
          {rateOfIngredients.map(({id, quantity}) => (
            <React.Fragment key={id}>
              <PokemonIngredientIcon id={id}/>
              <div>
              x{formatFloat(quantity)}
              </div>
            </React.Fragment>
          ))}
        </Flex>
      </Flex>
      <Flex direction="row" className="items-center gap-0.5 text-lg">
        <ColoredEnergyIcon dimension="h-6 w-6" alt={t('Stats.Energy.Name')}/>
        <div>
          {formatFloat(
            rateOfBerry.dailyEnergy +
            toSum(rateOfIngredients.map(({dailyEnergy}) => dailyEnergy)),
          )}
        </div>
      </Flex>
    </Flex>
  );
};

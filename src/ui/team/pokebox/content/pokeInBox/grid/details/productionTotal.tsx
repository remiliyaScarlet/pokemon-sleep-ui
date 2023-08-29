import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number';


export const PokeboxPokeInBoxProductionTotal = (props: PokeboxPokeInBoxCommonProps) => {
  const {pokemon} = props;

  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfBerry = getRateOfBerry(props);
  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <Flex direction="col" noFullWidth className="justify-center">
      <Flex direction="row" noFullWidth className={clsx(
        'items-center gap-0.5 px-1 text-[0.8rem]',
        pokemon.specialty === specialtyIdMap.berry && 'bg-blink',
      )}>
        <PokemonBerryIcon id={pokemon.berry.id}/>
        <div>
          {formatFloat(rateOfBerry.dailyEnergy)}
        </div>
      </Flex>
      <Flex direction="row" noFullWidth className={clsx(
        'items-center gap-0.5 px-1 text-[0.8rem]',
        pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
      )}>
        {rateOfIngredients.map(({id, dailyEnergy}) => (
          <React.Fragment key={id}>
            <PokemonIngredientIcon id={id}/>
            <div>
              {formatFloat(dailyEnergy)}
            </div>
          </React.Fragment>
        ))}
      </Flex>
      <Flex direction="row" className="items-center gap-0.5 px-1">
        <ColoredEnergyIcon dimension="h-5 w-5" alt={t('Stats.Energy.Name')}/>
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

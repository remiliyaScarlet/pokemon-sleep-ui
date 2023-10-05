import React from 'react';

import {clsx} from 'clsx';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProducingRateMultiple} from '@/components/shared/pokemon/production/multiple';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {defaultNeutralOpts} from '@/const/game/production';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {PokemonProductionIngredientLink} from '@/ui/pokedex/page/production/ingredient/link';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {toSum} from '@/utils/array';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDailyEnergyOfRate} from '@/utils/game/producing/rate';


type Props = PokemonProps & {
  level: number,
  calculatedSettings: CalculatedUserSettings,
  chain: IngredientChain,
};

export const PokemonProductionCombination = ({chain, ...props}: Props) => {
  const {level, pokemon, calculatedSettings} = props;

  return (
    <Grid className="grid-cols-1 gap-1 xl:grid-cols-2">
      {[...generatePossibleIngredientProductions({level, chain})].map((ingredients) => {
        const productionKeys = ingredients.map(({id}) => id).join('-');

        const rate = getPokemonProducingRate({
          ingredients,
          snorlaxFavorite: {},
          ...defaultNeutralOpts,
          ...calculatedSettings,
          ...props,
        });
        const {berry, ingredient} = rate;
        const ingredientRates = Object.values(ingredient);

        return (
          <AnimatedCollapse key={productionKeys} show appear>
            <Flex center noFullWidth className={clsx(
              'gap-1.5 rounded-lg bg-slate-500/10 p-1.5',
            )}>
              <Flex direction="row" center wrap className="gap-1">
                {ingredients.map((production) => (
                  <PokemonProductionIngredientLink
                    key={`${productionKeys}-${production.qty}`}
                    production={production}
                  />
                ))}
              </Flex>
              <PokemonProductionSplit
                berry={berry.energy.equivalent}
                ingredient={toSum(ingredientRates.map(({energy}) => energy.equivalent))}
                specialty={pokemon.specialty}
              />
              <Flex direction="row" className="items-end justify-between">
                <ProducingRateContent dailyRate={getDailyEnergyOfRate(rate)} isEnergy normalSize/>
                <Flex noFullWidth>
                  <PokemonProducingRateSingle
                    horizontal
                    hideFrequency
                    rate={berry}
                    getIcon={(dimension) => (
                      <PokemonBerryIcon id={berry.id} dimension={dimension}/>
                    )}
                  />
                  <PokemonProducingRateMultiple
                    horizontal
                    hideFrequency
                    rates={ingredientRates}
                    getIcon={(rate, dimension) => (
                      <PokemonIngredientIcon id={rate.id} dimension={dimension}/>
                    )}
                  />
                </Flex>
              </Flex>
            </Flex>
          </AnimatedCollapse>
        );
      })}
    </Grid>
  );
};

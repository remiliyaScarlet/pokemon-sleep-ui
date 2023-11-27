import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProducingRateMultiple} from '@/components/shared/pokemon/production/multiple';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {TranslatedUserSettings} from '@/types/userData/settings';
import {PokemonProductionIngredientLink} from '@/ui/pokedex/page/production/ingredient/link';
import {PokemonDataProps} from '@/ui/pokedex/page/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateNeutralParams} from '@/utils/game/producing/params';
import {getTotalEnergyOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';


type Props = PokemonDataProps & {
  level: number,
  translatedSettings: TranslatedUserSettings,
  chain: IngredientChain,
};

export const PokemonProductionCombination = ({chain, ...props}: Props) => {
  const {
    level,
    pokemon,
    translatedSettings,
    mainSkillMap,
  } = props;
  const skillData = mainSkillMap[pokemon.skill];

  return (
    <Grid className="grid-cols-1 gap-1 xl:grid-cols-2">
      {[...generatePossibleIngredientProductions({level, chain})].map((ingredients) => {
        const productionKeys = ingredients.map(({id}) => id).join('-');

        const rate = getPokemonProducingRateSingle({
          ingredients,
          snorlaxFavorite: {},
          skillData,
          ...getProducingRateNeutralParams({pokemon}),
          ...translatedSettings,
          ...props,
        });
        const {berry, ingredient} = rate;
        const ingredientRates = Object.values(ingredient);

        return (
          <AnimatedCollapse key={productionKeys} show appear>
            <Flex center noFullWidth className="bg-plate gap-1.5">
              <Flex direction="row" center wrap className="gap-1">
                {ingredients.map((production) => (
                  <PokemonProductionIngredientLink
                    key={`${productionKeys}-${production.qty}`}
                    production={production}
                  />
                ))}
              </Flex>
              <PokemonProductionSplitFromPokemonRate
                rate={rate}
                state="equivalent"
                specialty={pokemon.specialty}
              />
              <Flex direction="row" className="items-end justify-between">
                <ProducingRateContent
                  dailyRate={getTotalEnergyOfPokemonProducingRate(rate)}
                  isEnergy
                  normalSize
                />
                <Flex noFullWidth>
                  <PokemonProducingRateSingle
                    horizontal
                    hideFrequency
                    rate={berry}
                    getIcon={(dimension) => (
                      <PokemonBerryIcon id={berry.id} dimension={dimension}/>
                    )}
                    display="item"
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

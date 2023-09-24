import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonProducingRateContent} from '@/components/shared/pokemon/production/content';
import {PokemonProducingRateMultiple} from '@/components/shared/pokemon/production/multiple';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split';
import {defaultNeutralOpts} from '@/const/game/production';
import {imageSmallIconSizes} from '@/styles/image';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {PokemonIngredientIcon} from '@/ui/pokedex/page/production/ingredient/icon';
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
  const t = useTranslations('Game');

  return (
    <Grid className="grid-cols-1 gap-1 lg:grid-cols-2 2xl:grid-cols-3">
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
            <Flex direction="col" center noFullWidth className={clsx(
              'gap-1.5 rounded-lg bg-slate-500/10 p-1.5',
            )}>
              <Flex direction="row" center wrap className="gap-1">
                {ingredients.map((production) => (
                  <PokemonIngredientIcon key={`${productionKeys}-${production.qty}`} production={production}/>
                ))}
              </Flex>
              <PokemonProductionSplit
                berry={berry.dailyEnergy}
                ingredient={toSum(ingredientRates.map(({dailyEnergy}) => dailyEnergy))}
                specialty={pokemon.specialty}
              />
              <Flex direction="row" className="items-end justify-between">
                <PokemonProducingRateContent dailyRate={getDailyEnergyOfRate(rate)} normalSize/>
                <Flex direction="col" noFullWidth>
                  <PokemonProducingRateSingle
                    horizontal
                    hideFrequency
                    rate={berry}
                    icon={
                      <NextImage
                        src={`/images/berry/${berry.id}.png`}
                        alt={ t(`Berry.${berry.id}`)} sizes={imageSmallIconSizes}
                      />
                    }
                  />
                  <PokemonProducingRateMultiple
                    horizontal
                    hideFrequency
                    rates={ingredientRates}
                    getIcon={(rate) => (
                      <NextImage
                        src={`/images/ingredient/${rate.id}.png`}
                        alt={t(`Food.${rate.id}`)}
                        sizes={imageSmallIconSizes}
                      />
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

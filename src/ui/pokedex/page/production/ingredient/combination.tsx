import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonProducingRateMultiple} from '@/components/shared/pokemon/production/multiple';
import {imageSmallIconSizes} from '@/styles/image';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {PokemonIngredientIcon} from '@/ui/pokedex/page/production/ingredient/icon';
import {PokemonIngredientCommonProps} from '@/ui/pokedex/page/production/ingredient/type';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredients';


type Props = PokemonProps & PokemonIngredientCommonProps & {
  chain: IngredientChain,
};

export const PokemonIngredientCombination = ({level, chain, pokemon, bonus, ingredientMap}: Props) => {
  const t = useTranslations('Game');

  return (
    <Grid className="grid-cols-1 gap-1 lg:grid-cols-2">
      {[...generatePossibleIngredientProductions({level, chain})].map((productions) => {
        const productionKeys = productions.map(({id}) => id).join('-');

        const rates = getIngredientProducingRates({
          level,
          pokemon,
          ingredients: productions,
          ingredientMap,
          bonus,
          ...defaultNeutralOpts,
        });

        return (
          <AnimatedCollapse key={productionKeys} show appear>
            <Flex direction="col" center noFullWidth className={clsx(
              'gap-1.5 rounded-lg bg-slate-500/10 p-1.5',
            )}>
              <Flex direction="row" center wrap className="gap-1">
                {productions.map((production) => (
                  <PokemonIngredientIcon key={`${productionKeys}-${production.qty}`} production={production}/>
                ))}
              </Flex>
              <PokemonProducingRateMultiple
                simplified
                horizontal
                rates={rates}
                getIcon={(rate) => (
                  <NextImage
                    src={`/images/ingredient/${rate.id}.png`}
                    alt={t(`Food.${rate.id}`)}
                    sizes={imageSmallIconSizes}
                  />
                )}
              />
            </Flex>
          </AnimatedCollapse>
        );
      })}
    </Grid>
  );
};

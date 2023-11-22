import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Link} from '@/components/i18n/exports';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {imageIconSizes} from '@/styles/image';
import {MealIngredientSectionProps} from '@/ui/meal/page/type';


export const MealIngredientSection = ({
  meal,
  preloadedSettings,
  calculatedSettings,
  ingredient,
  pokemonLevel,
  pokemonOfIngredientLevel,
  ...props
}: MealIngredientSectionProps) => {
  const {ingredientMap} = props;
  const {id, quantity} = ingredient;
  const {pokemonIngredientProductionOfLevel} = pokemonOfIngredientLevel;

  const t = useTranslations('Game.Food');

  return (
    <Flex key={id} direction="row" className="gap-2">
      <Link href={`/ingredient/${id}`} className="button-clickable-bg">
        <Flex center className="h-full">
          <div className="relative h-12 w-12">
            <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
          </div>
          <div>{quantity}</div>
        </Flex>
      </Link>
      <Flex center className={clsx(
        'border-common rounded-r-lg border-y-2 border-r-2 py-2 pr-2',
      )}>
        <PokemonIngredientStats
          level={pokemonLevel}
          ingredient={ingredientMap[id]}
          pokemonIngredientProduction={pokemonIngredientProductionOfLevel[id] ?? []}
          {...calculatedSettings}
          {...props}
        />
      </Flex>
    </Flex>
  );
};

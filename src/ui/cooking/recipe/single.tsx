import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {useRecipeInfo} from '@/ui/cooking/recipe/hook';
import {CookingRecipeIngredients} from '@/ui/cooking/recipe/parts/ingredients';
import {CookingRecipeLevel} from '@/ui/cooking/recipe/parts/level';
import {CookingRecipeStats} from '@/ui/cooking/recipe/parts/stats';
import {CookingRecipeTitle} from '@/ui/cooking/recipe/parts/title';
import {CookingRecipePartsProps} from '@/ui/cooking/recipe/parts/type';
import {CookingRecipeSingleProps} from '@/ui/cooking/recipe/type';


export const CookingRecipeSingle = (props: CookingRecipeSingleProps) => {
  const {
    meal,
    filter,
    showUnmakeableRecipe,
  } = props;
  const {id} = meal;

  const t2 = useTranslations('Game.Food');
  const recipeInfo = useRecipeInfo({
    meal,
    ingredientCount: filter.ingredientCount,
  });

  const {isMealMakeable} = recipeInfo;
  const mealName = t2(id.toString());

  const partsProps: CookingRecipePartsProps = {
    ...props,
    ...recipeInfo,
    mealName,
  };

  const onClick = () => {

  };

  return (
    <AnimatedCollapseQuick show={showUnmakeableRecipe || isMealMakeable}>
      <FlexButton direction="col" noFullWidth={false} onClick={onClick} className={clsx(
        'button-clickable-bg group relative h-full',
      )}>
        <Flex className="z-10 gap-1 p-2">
          <CookingRecipeTitle {...partsProps}/>
          <CookingRecipeLevel {...partsProps}/>
          <CookingRecipeIngredients {...partsProps}/>
          <CookingRecipeStats {...partsProps}/>
        </Flex>
        <div className="absolute bottom-0 right-0 h-20 w-20 opacity-30">
          <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imageIconSizes}/>
        </div>
      </FlexButton>
    </AnimatedCollapseQuick>
  );
};

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
import {CookingPopup} from '@/ui/cooking/recipe/popup/main';
import {CookingRecipeSingleProps} from '@/ui/cooking/recipe/type';


export const CookingRecipeSingle = (props: CookingRecipeSingleProps) => {
  const {
    meal,
    filter,
    showUnmakeableRecipe,
  } = props;
  const {id} = meal;

  const [show, setShow] = React.useState(false);
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

  return (
    <AnimatedCollapseQuick show={showUnmakeableRecipe || isMealMakeable}>
      <CookingPopup {...props} show={show} setShow={setShow}/>
      <Flex className="info-section-bg gap-1 rounded-lg p-2">
        <CookingRecipeTitle {...partsProps}/>
        <CookingRecipeLevel {...partsProps}/>
        <FlexButton direction="col" noFullWidth={false} onClick={() => setShow(true)} className={clsx(
          'button-clickable-bg group relative h-full',
        )}>
          <Flex className="z-10 gap-1 p-1">
            <CookingRecipeIngredients {...partsProps}/>
            <CookingRecipeStats {...partsProps}/>
          </Flex>
          <div className="absolute bottom-0 right-0 h-20 w-20 opacity-30">
            <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imageIconSizes}/>
          </div>
        </FlexButton>
      </Flex>
    </AnimatedCollapseQuick>
  );
};

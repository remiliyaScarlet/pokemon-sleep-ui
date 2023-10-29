import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {useRecipeInfo} from '@/ui/cooking/make/recipe/hook';
import {MealMakerRecipeIngredients} from '@/ui/cooking/make/recipe/parts/ingredients';
import {MealMakerRecipeLevel} from '@/ui/cooking/make/recipe/parts/level';
import {MealMakerRecipeStats} from '@/ui/cooking/make/recipe/parts/stats';
import {MealMakerRecipeTitle} from '@/ui/cooking/make/recipe/parts/title';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';
import {MealMakerPopup} from '@/ui/cooking/make/recipe/popup/main';
import {MealMakerRecipeSingleProps} from '@/ui/cooking/make/recipe/type';


export const MealMakerRecipeSingle = (props: MealMakerRecipeSingleProps) => {
  const {
    meal,
    filter,
    showUnmakeableRecipe,
  } = props;
  const {id} = meal;

  const [show, setShow] = React.useState(false);
  const t = useTranslations('Game.Food');
  const recipeInfo = useRecipeInfo({
    meal,
    inventory: filter.inventory,
  });

  const {isMealMakeable} = recipeInfo;
  const mealName = t(id.toString());

  const partsProps: MealMakerRecipePartsProps = {
    ...props,
    ...recipeInfo,
    mealName,
  };

  return (
    <AnimatedCollapseQuick show={showUnmakeableRecipe || isMealMakeable}>
      <MealMakerPopup {...props} show={show} setShow={setShow}/>
      <Flex className="info-section-bg gap-1 rounded-lg p-2">
        <MealMakerRecipeTitle {...partsProps}/>
        <MealMakerRecipeLevel {...partsProps}/>
        <FlexButton direction="col" noFullWidth={false} onClick={() => setShow(true)} className={clsx(
          'button-clickable-bg group relative h-full',
        )}>
          <Flex className="z-10 gap-1 p-1">
            <MealMakerRecipeIngredients {...partsProps}/>
            <MealMakerRecipeStats {...partsProps}/>
          </Flex>
          <div className="absolute bottom-0 right-0 h-20 w-20 opacity-30">
            <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imageIconSizes}/>
          </div>
        </FlexButton>
      </Flex>
    </AnimatedCollapseQuick>
  );
};

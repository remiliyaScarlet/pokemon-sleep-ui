import React from 'react';

import {useTranslations} from 'next-intl';

import {Link} from '@/components/i18n';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {recipeMaxLevel} from '@/const/game/meal';
import {imageGallerySizes} from '@/styles/image';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {getMealBaseStrength} from '@/utils/game/meal/base';
import {getMealIngredientCount} from '@/utils/game/meal/count';


type Props = {
  cookableMeals: Meal[],
  ingredientMap: IngredientMap,
};

export const IngredientCookableMeals = ({cookableMeals, ingredientMap}: Props) => {
  const t = useTranslations('Game.Food');
  const t2 = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" center wrap className="info-section">
      {cookableMeals
        .sort((a, b) => (
          getMealBaseStrength({level: recipeMaxLevel, meal: a, ingredientMap}).strengthFinal -
          getMealBaseStrength({level: recipeMaxLevel, meal: b, ingredientMap}).strengthFinal
        ))
        .map((meal) => (
          <Link key={meal.id} href={`/meal/${meal.id}`}>
            <Flex center className="button-clickable-bg gap-1 p-1.5">
              <div className="text-sm">
                {t(meal.id.toString())}
              </div>
              <IconWithInfo
                imageSrc={`/images/meal/portrait/${meal.id}.png`}
                imageAlt={t(meal.id.toString())}
                imageDimension="h-12 w-12"
                imageSizes={imageGallerySizes}
                info={getMealIngredientCount(meal)}
              />
              <IngredientIconsFromMeal meal={meal} useTextShadow={false}/>
              <Flex direction="row" center className="gap-0.5">
                <ColoredEnergyIcon dimension="h-4 w-4" alt={t2('Energy')}/>
                <div className="text-sm">
                  {getMealBaseStrength({level: recipeMaxLevel, meal, ingredientMap}).strengthFinal}
                </div>
              </Flex>
            </Flex>
          </Link>
        ))}
    </Flex>
  );
};

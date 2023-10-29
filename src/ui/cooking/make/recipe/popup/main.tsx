import React from 'react';

import FireIcon from '@heroicons/react/24/outline/FireIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {PopupProps} from '@/components/popup/type';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {MealMeta} from '@/components/shared/meal/meta';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {IngredientCounter} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {CookingInputIngredientCounter} from '@/ui/cooking/common/input/ingredients';
import {MealMakerPopupCommonProps} from '@/ui/cooking/make/recipe/popup/type';
import {MealMakerFilter} from '@/ui/cooking/make/type';
import {
  subtractIngredientCount,
  toCookingCountFromMealIngredient,
  toMealIngredientFromCookingCount,
} from '@/utils/game/cooking';
import {getMealFinalStrength} from '@/utils/game/meal/main';
import {formatInt} from '@/utils/number/format';


type Props = PopupProps & MealMakerPopupCommonProps & {
  meal: Meal,
  filter: MealMakerFilter,
};

export const MealMakerPopup = ({filter, calculatedSettings, status, onCook, ...props}: Props) => {
  const {meal, ingredientMap, setShow} = props;

  const t = useTranslations('UI.InPage.Cooking');
  const requiredIngredients = React.useMemo(() => toCookingCountFromMealIngredient(meal.ingredients), [meal]);
  const [usages, setUsages] = React.useState<IngredientCounter>(requiredIngredients);

  const {strengthFinal, bonusRateWithFiller} = getMealFinalStrength({
    ...props,
    level: filter.recipeLevel[meal.id] ?? 1,
    filler: toMealIngredientFromCookingCount(subtractIngredientCount(usages, requiredIngredients)),
    mapBonus: calculatedSettings.bonus.map,
  });

  const isRequirementSatisfied = Object.values(subtractIngredientCount(requiredIngredients, usages))
    .every((count) => !count);

  return (
    <PopupCommon {...props}>
      <Flex className="gap-1 md:w-[60vw] lg:w-[70vw]">
        <Flex className="gap-1 lg:flex-row">
          <MealMeta meal={meal} className="bg-plate"/>
          <Flex className="bg-plate justify-center gap-2">
            <CookingInputIngredientCounter
              ingredientMap={ingredientMap}
              counter={usages}
              minCount={requiredIngredients}
              showIngredient={() => true}
              onValueChanged={({id}, count) => setUsages((original) => ({
                ...original,
                [id]: count,
              }))}
            />
            <HorizontalSplitter className="w-full"/>
            <Flex direction="row" className="justify-between text-xl">
              <Flex direction="row" noFullWidth className="items-center gap-1">
                <ColoredEnergyIcon dimension="h-6 w-6" alt={t('Energy')}/>
                <div>
                  {formatInt(strengthFinal)}
                </div>
              </Flex>
              {
                isRequirementSatisfied &&
                <div>+{(bonusRateWithFiller * 100 - 100).toFixed(1)}%</div>
              }
            </Flex>
          </Flex>
        </Flex>
        <Flex className="items-end">
          <button
            disabled={!isRequirementSatisfied || status !== 'waiting'}
            onClick={async () => {
              await onCook(usages);
              setShow(false);
            }}
            className="enabled:button-clickable-bg disabled:button-disabled h-8 w-8 p-1"
          >
            {status === 'waiting' ? <FireIcon/> : actionStatusIcon[status]}
          </button>
        </Flex>
      </Flex>
    </PopupCommon>
  );
};

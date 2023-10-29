import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PotIcon} from '@/components/shared/icon/pot';
import {NumberInputOptional} from '@/components/shared/input/number/optional/main';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {imageIconSizes} from '@/styles/image';
import {Meal} from '@/types/game/meal/main';
import {CookingInputRecipeLevel} from '@/ui/cooking/common/input/level';
import {CookingExternalLink} from '@/ui/cooking/common/link';
import {MealPreparerInfoOfMealType} from '@/ui/cooking/prepare/mealType/type';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';
import {formatInt} from '@/utils/number/format';


type Props = MealPreparerCommonProps & {
  meal: Meal,
  info: MealPreparerInfoOfMealType,
};

export const MealPreparerRecipe = (props: Props) => {
  const {
    filter,
    setFilter,
    meal,
    info,
  } = props;
  const {id} = meal;

  const t = useTranslations('UI.InPage.Cooking');
  const t2 = useTranslations('Game.Food');

  const mealName = t2(id.toString());
  const count = filter.mealsWanted[id];

  return (
    <Flex className="bg-plate relative rounded-lg p-2">
      <Flex className={clsx('z-10 gap-1.5', !count && 'text-slate-600/80 dark:text-slate-400/80')}>
        <Flex direction="row" className="justify-between">
          <div className={clsx('truncate text-sm')}>
            {mealName}
          </div>
          <CookingExternalLink mealId={id}/>
        </Flex>
        <IngredientIconsFromMeal meal={meal}/>
        <CookingInputRecipeLevel {...props}/>
        <NumberInputOptional
          text={<PotIcon alt={t('TargetMealCount')} dimension="h-6 w-6"/>}
          value={count}
          min={0}
          onClickDefault={1}
          setValue={(count) => setFilter((original) => ({
            ...original,
            mealsWanted: {
              ...original.mealsWanted,
              [id]: count,
            },
          } satisfies MealPreparerFilter))}
        />
        <Flex direction="row" noFullWidth className="items-center gap-1">
          <ColoredEnergyIcon alt={t('Energy')}/>
          <div>
            {formatInt(info.finalStrength[id])}
          </div>
        </Flex>
      </Flex>
      <div className="absolute bottom-0 right-0 h-16 w-16 self-end opacity-30">
        <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imageIconSizes}/>
      </div>
    </Flex>
  );
};

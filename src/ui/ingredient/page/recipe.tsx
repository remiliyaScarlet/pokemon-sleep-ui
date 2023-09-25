import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {imageGallerySizes} from '@/styles/image';
import {Meal} from '@/types/game/meal';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {formatInt} from '@/utils/number';


type Props = {
  cookableMeals: Meal[]
};

export const IngredientCookableMeals = ({cookableMeals}: Props) => {
  const t = useTranslations('Game.Food');
  const t2 = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" center wrap className="info-section gap-1">
      {cookableMeals
        .sort((a, b) => (a.levels.at(-1)?.energy ?? 0) - (b.levels.at(-1)?.energy ?? 0))
        .map((meal) => (
          <Link key={meal.id} href={`/meal/${meal.id}`}>
            <Flex direction="col" center className="button-clickable-bg gap-1 p-1.5">
              <div className="text-sm">
                {t(meal.id.toString())}
              </div>
              <IconWithInfo
                imageSrc={`/images/meal/portrait/${meal.id}.png`}
                imageAlt={t(meal.id.toString())}
                imageDimension="h-12 w-12"
                imageSizes={imageGallerySizes}
                info={getMealRequiredQuantity(meal)}
              />
              <IngredientIconsFromMeal meal={meal} useTextShadow={false}/>
              <Flex direction="row" center className="gap-0.5">
                <ColoredEnergyIcon dimension="h-4 w-4" alt={t2('Energy')}/>
                <div className="text-sm">
                  {formatInt(meal.levels.at(-1)?.energy)}
                </div>
              </Flex>
            </Flex>
          </Link>
        ))}
    </Flex>
  );
};

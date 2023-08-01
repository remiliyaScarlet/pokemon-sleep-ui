import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {imageGallerySizes, imageIconSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';
import {IconWithInfo} from '@/ui/ingredient/page/iconInfo';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type Props = {
  cookableMeals: Meal[]
};

export const IngredientCookableMeals = ({cookableMeals}: Props) => {
  const t = useTranslations('Game.Food');
  const t2 = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" center wrap className="info-section h-full gap-1">
      {cookableMeals
        .sort((a, b) => (a.levels.at(-1)?.energy ?? 0) - (b.levels.at(-1)?.energy ?? 0))
        .map((meal) => (
          <Link key={meal.id} href={`/meal/${meal.id}`}>
            <Flex direction="col" center className="button-clickable-bg gap-0.5 p-1.5">
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
              <Flex direction="row" center className="gap-0.5">
                <IngredientIcons meal={meal} useTextShadow={false}/>
              </Flex>
              <Flex direction="row" center className="gap-0.5">
                <div className="relative h-4 w-4">
                  <NextImage src="/images/generic/energy.png" alt={t2('Energy')} sizes={imageIconSizes}/>
                </div>
                <div className="text-sm">
                  {meal.levels.at(-1)?.energy ?? '-'}
                </div>
              </Flex>
            </Flex>
          </Link>
        ))}
    </Flex>
  );
};

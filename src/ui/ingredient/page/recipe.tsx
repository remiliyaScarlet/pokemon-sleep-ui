import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {buttonStyle, buttonStyleClickable, infoSectionStyle} from '@/styles/classes';
import {imageGallerySizes, imageIconSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {classNames} from '@/utils/react';


type Props = {
  cookableMeals: Meal[]
};

export const IngredientCookableMeals = ({cookableMeals}: Props) => {
  const t = useTranslations('Game.Food');
  const t2 = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" center wrap className={classNames(infoSectionStyle, 'gap-1')}>
      {cookableMeals
        .sort((a, b) => (a.levels.at(-1)?.energy ?? 0) - (b.levels.at(-1)?.energy ?? 0))
        .map((meal) => (
          <Link key={meal.id} href={`/meal/${meal.id}`}>
            <Flex
              direction="col" center
              className={classNames(buttonStyleClickable, buttonStyle.background, 'p-1.5 gap-0.5')}
            >
              <div className="text-sm">
                {t(meal.id.toString())}
              </div>
              <div className="relative h-12 w-12">
                <Flex
                  direction="col" center noFullWidth
                  className={classNames(
                    'absolute bottom-0 right-0 z-10 h-5 w-5 rounded-full',
                    'bg-slate-400/70 text-xs dark:bg-slate-500/70',
                  )}
                >
                  {getMealRequiredQuantity(meal)}
                </Flex>
                <Image
                  src={`/images/meal/portrait/${meal.id}.png`} alt={t(meal.id.toString())} fill
                  sizes={imageGallerySizes}
                />
              </div>
              <Flex direction="row" center className="gap-0.5">
                <IngredientIcons meal={meal} useTextShadow={false}/>
              </Flex>
              <Flex direction="row" center className="gap-0.5">
                <div className="relative h-4 w-4">
                  <Image src="/images/generic/energy.png" alt={t2('Energy')} fill sizes={imageIconSizes}/>
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

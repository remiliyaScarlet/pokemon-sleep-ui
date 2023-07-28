import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {buttonStyleClickable, infoSectionStyle, mealTypeTextStyle} from '@/styles/classes';
import {imageIconSizes, imagePortraitSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';
import {MealExp} from '@/ui/meal/page/exp';
import {classNames} from '@/utils/react';


export const MealMeta = (meal: Meal) => {
  const t = useTranslations('Game.Food');
  const {id, type} = meal;

  const mealName = t(id.toString());

  return (
    <Flex direction="col" center noFullWidth className={classNames(infoSectionStyle, 'w-full')}>
      <div className={classNames('text-lg', mealTypeTextStyle[type])}>
        {mealName}
      </div>
      <div className="relative h-44 w-44 rounded-lg border border-slate-300 dark:border-slate-700">
        <Image src={`/images/meal/portrait/${id}.png`} alt={mealName} fill sizes={imagePortraitSizes}/>
      </div>
      <I18nProvider namespaces={['UI.InPage.Cooking']}>
        <MealExp {...meal}/>
      </I18nProvider>
      <Flex direction="row" center className="gap-1.5">
        {meal.ingredients.map(({id, quantity}) => (
          <Link
            key={id}
            href={`/ingredient/${id}`}
            className={classNames(buttonStyleClickable, 'p-1.5')}
          >
            <Flex direction="col" center>
              <div className="relative h-12 w-12">
                <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageIconSizes}/>
              </div>
              <div>
                {quantity}
              </div>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

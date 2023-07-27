import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {textShadow} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {MealLinkProps} from '@/ui/meal/index/type';
import {toSum} from '@/utils/array';
import {classNames} from '@/utils/react';


export const MealLinkDetail = ({ingredients}: MealLinkProps) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex
        direction="row" noFullWidth center
        className={classNames('rounded-full bg-slate-400/70 dark:bg-slate-500/70 w-6 h-6', textShadow)}
      >
        {toSum(ingredients.map(({quantity}) => quantity))}
      </Flex>
      {ingredients.map(({id, quantity}) => (
        <>
          <div className="relative h-4 w-4">
            <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageIconSizes}/>
          </div>
          <div className={textShadow}>
            {quantity}
          </div>
        </>
      ))}
    </Flex>
  );
};

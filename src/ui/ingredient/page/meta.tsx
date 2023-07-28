import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {infoSectionStyle} from '@/styles/classes';
import {imagePortraitSizes, imageSmallIconSizes} from '@/styles/image';
import {Ingredient} from '@/types/mongo/ingredient';
import {classNames} from '@/utils/react';


export const IngredientMeta = (ingredient: Ingredient) => {
  const {id, energy, price} = ingredient;

  const t = useTranslations('Game.Food');
  const t2 = useTranslations('UI.Common');
  const t3 = useTranslations('UI.InPage.Ingredient');

  const ingredientName = t(id.toString());

  return (
    <Flex direction="col" center className={classNames(infoSectionStyle, 'md:w-fit')}>
      <div className="text-xl">
        {ingredientName}
      </div>
      <div className="relative h-44 w-44 rounded-lg border border-slate-300 dark:border-slate-700">
        <Image src={`/images/ingredient/${id}.png`} alt={ingredientName} fill sizes={imagePortraitSizes}/>
      </div>
      <table className="-m-1 border-separate border-spacing-1 text-xl">
        <tbody>
          <tr>
            <td>
              <div className="relative h-7 w-7">
                <Image src="/images/generic/energy.png" alt={t3('Energy')} fill sizes={imageSmallIconSizes}/>
              </div>
            </td>
            <td>
              {energy}
            </td>
          </tr>
          <tr>
            <td>
              <div className="relative h-7 w-7">
                <Image src="/images/generic/shard.png" alt={t2('DreamShards')} fill sizes={imageSmallIconSizes}/>
              </div>
            </td>
            <td>
              {price}
            </td>
          </tr>
        </tbody>
      </table>
    </Flex>
  );
};

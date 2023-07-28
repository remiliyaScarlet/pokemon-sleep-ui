import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {buttonStyleClickable} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {Ingredient} from '@/types/mongo/ingredient';
import {classNames} from '@/utils/react';


type Props = {
  ingredient: Ingredient,
};

export const IngredientLink = ({ingredient}: Props) => {
  const {id, price, energy} = ingredient;
  const t = useTranslations('UI.InPage.Ingredient');
  const t2 = useTranslations('UI.Common');
  const t3 = useTranslations('Game.Food');

  const ingredientName = t3(id.toString());

  return (
    <Link href={`/ingredient/${id}`}>
      <Flex key={id} direction="col" center className={classNames('gap-0.5 p-1', buttonStyleClickable)} noFullWidth>
        <div className="relative h-12 w-12">
          <Image src={`/images/ingredient/${id}.png`} alt={ingredientName} fill sizes={imageSmallIconSizes}/>
        </div>
        <div className="whitespace-nowrap p-1">
          {ingredientName}
        </div>
        <table className="-m-1 border-separate border-spacing-0.5 text-sm">
          <tbody>
            <tr>
              <td>
                <div className="relative h-4 w-4">
                  <Image src="/images/generic/energy.png" alt={t('Energy')} fill sizes={imageSmallIconSizes}/>
                </div>
              </td>
              <td>
                {energy}
              </td>
            </tr>
            <tr>
              <td>
                <div className="relative h-4 w-4">
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
    </Link>
  );
};

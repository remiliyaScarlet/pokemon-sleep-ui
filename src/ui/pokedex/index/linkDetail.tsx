import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';


export const PokedexLinkDetail = React.memo(({
  berry,
  skill,
  ingredients,
  display,
}: PokedexLinkProps) => {
  const t = useTranslations('Game');

  if (display === 'berry') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <Image src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)} fill sizes={imageIconSizes}/>
        </div>
        <div>
          {berry.quantity}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkill') {
    return (
      <div className="text-xs">
        {t(`MainSkill.Name.${skill}`)}
      </div>
    );
  }

  if (display === 'ingredient') {
    return (
      <Flex direction="row" className="gap-0.5">
        {ingredients.map((ingredient) => (
          <div key={ingredient} className="relative h-5 w-5">
            <Image
              src={`/images/ingredient/${ingredient}.png`} alt={t(`Food.${ingredient}`)}
              fill sizes={imageIconSizes}
            />
          </div>
        ))}
      </Flex>
    );
  }

  return <></>;
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';

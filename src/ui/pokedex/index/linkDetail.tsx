import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {imageSizes} from '@/ui/pokedex/index/const';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';


export const PokedexLinkDetail = React.memo(({berry, skill, display}: PokedexLinkProps) => {
  const t = useTranslations('Game');

  if (display === 'berry') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <Image src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)} fill sizes={imageSizes}/>
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

  return <></>;
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';

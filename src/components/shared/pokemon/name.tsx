import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';


type Props = {
  pokemon: PokemonInfo,
};

export const PokemonName = ({pokemon}: Props) => {
  const {type, id} = pokemon;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" className="items-end justify-center gap-1 p-2.5 text-2xl">
      <div className="relative h-8 w-8">
        <NextImage src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} sizes={imageSmallIconSizes}/>
      </div>
      <div>
        {t(`PokemonName.${id}`)}
      </div>
      <div className="text-sm text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};

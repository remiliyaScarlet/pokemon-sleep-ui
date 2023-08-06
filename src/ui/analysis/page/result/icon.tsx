import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId} from '@/types/mongo/pokemon';
import {classNames} from '@/utils/react';


type Props = {
  id: PokemonId,
};

export const AnalysisPokemonIcon = ({id}: Props) => {
  const t = useTranslations('Game.PokemonName');
  const t2 = useTranslations('UI.Metadata');

  const name = t(id.toString());

  return (
    <Flex direction="row" className={classNames(
      'relative button-bg rounded-lg p-1',
      'width-with-gap-xs width-with-gap-3-items md:width-with-gap-5-items',
    )}>
      <div className="relative h-12 w-12">
        <NextImage src={`/images/pokemon/icons/${id}.png`} alt={name} sizes={imageIconSizes}/>
      </div>
      <Flex direction="col" noFullWidth className="ml-auto">
        <Link href={`/pokedex/${id}`} className="button-clickable group relative h-6 w-6">
          <NextImage
            src="/images/generic/pokeball.png" alt={t2('Pokedex.Page.Title', {name})}
            sizes={imageIconSizes} className="invert-hoverable"
          />
        </Link>
        <Link href={`/analysis/${id}`} className="button-clickable group relative mt-auto h-6 w-6">
          <NextImage
            src="/images/generic/analysis.png" alt={t2('Analysis.Page.Title', {name})}
            sizes={imageIconSizes} className="invert-hoverable"
          />
        </Link>
      </Flex>
    </Flex>
  );
};

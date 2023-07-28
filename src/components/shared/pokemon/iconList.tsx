import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {PokemonId} from '@/types/mongo/pokemon';
import {IconWithInfo} from '@/ui/ingredient/page/iconInfo';


type Props = {
  pokemonIds: PokemonId[] | undefined,
  getInfo?: (id: PokemonId) => React.ReactNode,
};

export const PokemonIconList = ({pokemonIds, getInfo}: Props) => {
  const t = useTranslations('Game.PokemonName');

  if (!pokemonIds?.length) {
    return (
      <Image
        src="/images/generic/pokeball_unavailable.png" alt="N/A" fill
        sizes="(max-width: 768px) 70vw, 45vw"
      />
    );
  }

  return (
    <Flex direction="row" center wrap>
      {pokemonIds.map((id) => (
        <Link key={id} href={`/pokedex/${id}`}>
          <div className="button-clickable p-1.5">
            <IconWithInfo
              imageSrc={`/images/pokemon/icons/${id}.png`}
              imageAlt={t(id.toString())}
              imageDimension="h-12 w-12"
              imageSizes={imageIconSizes}
              info={getInfo && getInfo(id)}
            />
          </div>
        </Link>
      ))}
    </Flex>
  );
};

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {buttonStyle} from '@/styles/classes';
import {PokemonId} from '@/types/mongo/pokemon';
import {classNames} from '@/utils/react';


type Props = {
  pokemonIds: PokemonId[] | undefined
};

export const PokemonIconList = ({pokemonIds}: Props) => {
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
      {pokemonIds.map((id) =>(
        <div key={id} className={classNames('p-1.5', buttonStyle.base, buttonStyle.background, buttonStyle.text)}>
          <div className="relative h-12 w-12">
            <Link href={`/pokedex/${id}`}>
              <Image
                src={`/images/pokemon/icons/${id}.png`} alt={t(id.toString())} fill
                sizes="(max-width: 768px) 60vw, 40vw"
              />
            </Link>
          </div>
        </div>
      ))}
    </Flex>
  );
};

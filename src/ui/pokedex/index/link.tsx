import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokedexSinglePokemon} from '@/ui/pokedex/index/type';
import {classNames} from '@/utils/react';


type Props = Pick<PokedexSinglePokemon, 'id' | 'type' | 'berry'>;

export const PokedexLink = ({id, type, berry}: Props) => {
  const t = useTranslations('Game');

  return (
    <Link
      href={`/pokedex/${id}`}
      className={classNames(
        'group inline-block h-full w-full rounded-lg',
        'bg-slate-400/50 hover:bg-slate-500/70 dark:bg-slate-600/50 hover:dark:bg-slate-500',
      )}
    >
      <Flex direction="row" className="h-full items-center justify-end gap-1.5">
        <Flex
          direction="row"
          className={classNames(
            'absolute left-1 top-1 z-10 whitespace-nowrap items-center gap-0.5',
            'shadow-slate-200 text-shadow dark:shadow-slate-900',
          )}
        >
          <div className="relative h-5 w-5">
            <Image src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} fill className="drop-shadow-thick"/>
          </div>
          <div>
            {t(`PokemonName.${id}`)}
          </div>
        </Flex>
        <Flex direction="row" className="absolute bottom-1 left-1 z-10 gap-0.5">
          <div className="relative h-5 w-5">
            <Image src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)} fill/>
          </div>
          <div className="text-sm">
            {berry.quantity}
          </div>
        </Flex>
        <div className="relative h-16 w-16">
          <Image src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)} fill/>
        </div>
      </Flex>
    </Link>
  );
};

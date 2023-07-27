import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {textShadow} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {PokedexLinkDetail} from '@/ui/pokedex/index/linkDetail';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {classNames} from '@/utils/react';


export const PokedexLink = (props: PokedexLinkProps) => {
  const {id, type} = props;
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
            textShadow,
          )}
        >
          <div className="relative h-5 w-5">
            <Image
              src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} fill
              className="drop-shadow-thick" sizes={imageIconSizes}
            />
          </div>
          <div>
            {t(`PokemonName.${id}`)}
          </div>
        </Flex>
        <Flex direction="col" className="absolute bottom-1 left-1 z-10 gap-0.5 text-sm">
          <PokedexLinkDetail {...props}/>
        </Flex>
        <div className="relative h-16 w-16 opacity-70">
          <Image
            src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
            fill sizes={imageIconSizes}
          />
        </div>
      </Flex>
    </Link>
  );
};

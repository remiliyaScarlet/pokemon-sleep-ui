import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokedexLinkDetail} from '@/ui/pokedex/index/linkDetail';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {classNames} from '@/utils/react';


export const PokedexLink = (props: PokedexLinkProps) => {
  const {pokemon} = props;
  const {id, type} = pokemon;
  const t = useTranslations('Game');

  // This `<Flex>` needs to be outside `<Link>` to avoid `<a>` in `<a>` DOM tree issue
  return (
    <>
      <Flex direction="col" className="absolute bottom-1 left-1 z-10 gap-0.5 text-sm">
        <PokedexLinkDetail {...props}/>
      </Flex>
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
            className="text-shadow-preset absolute left-1 top-1 z-10 items-center gap-0.5 whitespace-nowrap"
          >
            <div className="relative h-5 w-5">
              <NextImage
                src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)}
                sizes={imageIconSizes} className="drop-shadow-thick"
              />
            </div>
            <div>
              {t(`PokemonName.${id}`)}
            </div>
          </Flex>
          <div className="relative h-16 w-16 opacity-70">
            <NextImage
              src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
              sizes={imageIconSizes}
            />
          </div>
        </Flex>
      </Link>
    </>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {imageIconSizes} from '@/styles/image';
import {PokemonId} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


type Props<TData> = {
  dataWithPokemonId: TData[] | undefined,
  getPokemonId: (data: TData) => PokemonId,
  getInfo?: (data: TData) => React.ReactNode,
  getReactKey?: (data: TData) => React.Key,
  getPokemonLink?: (id: number) => string,
  size?: Dimension,
};

export const PokemonIconList = <TData, >({
  dataWithPokemonId,
  getPokemonId,
  getInfo,
  getReactKey,
  getPokemonLink,
  size,
}: Props<TData>) => {
  const t = useTranslations('Game.PokemonName');

  if (!dataWithPokemonId?.length) {
    return (
      <div className="p-1.5">
        <UnavailableIcon/>
      </div>
    );
  }

  return (
    <Flex direction="row" center wrap>
      {dataWithPokemonId.map((data) => {
        const id = getPokemonId(data);

        return (
          <Link
            key={getReactKey ? getReactKey(data) : getPokemonId(data)}
            href={getPokemonLink ? getPokemonLink(id) : `/pokedex/${id}`}
          >
            <div className="button-clickable p-1.5">
              <IconWithInfo
                imageSrc={`/images/pokemon/icons/${id}.png`}
                imageAlt={t(id.toString())}
                imageDimension={size ?? 'h-12 w-12'}
                imageSizes={imageIconSizes}
                info={getInfo && getInfo(data)}
              />
            </div>
          </Link>
        );
      })}
    </Flex>
  );
};

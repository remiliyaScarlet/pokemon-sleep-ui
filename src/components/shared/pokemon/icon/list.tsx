import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props<TData> = {
  dataWithPokemon: TData[] | undefined,
  getPokemon: (data: TData) => PokemonInfo | undefined,
  getPokemonId: (data: TData) => PokemonId,
  getInfo?: (data: TData) => React.ReactNode,
  getReactKey?: (data: TData) => React.Key,
  getClassName?: (data: TData) => string,
  onClickOverride?: (data: TData) => void,
  showData: (data: TData) => boolean,
  size?: Dimension,
};

export const PokemonIconList = <TData, >({
  dataWithPokemon,
  getPokemon,
  getPokemonId,
  getInfo,
  getReactKey,
  getClassName,
  onClickOverride,
  showData,
  size,
}: Props<TData>) => {
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const t = useTranslations('Game.PokemonName');

  if (!dataWithPokemon?.length) {
    return (
      <div className="p-1.5">
        <UnavailableIcon/>
      </div>
    );
  }

  const dimension = size ?? 'h-12 w-12';

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex direction="row" center wrap>
        {dataWithPokemon.map((data, idx) => {
          const pokemon = getPokemon(data);

          if (!pokemon) {
            return (
              <UnavailableIcon key={`Unavailable-${idx}`} dimension={dimension} text={`#${getPokemonId(data)}`}/>
            );
          }

          const {id} = pokemon;

          return (
            showData(data) &&
              <button
                key={getReactKey ? getReactKey(data) : id}
                className={clsx('button-clickable p-1.5', getClassName && getClassName(data))}
                onClick={() => onClickOverride ? onClickOverride(data) : showPokemon(pokemon)}
              >
                <AnimatedCollapse
                  key={dataWithPokemon.filter((row) => {
                    return showData(row);
                  }).length}
                  show={true}
                  appear
                >
                  <IconWithInfo
                    imageSrc={`/images/pokemon/icons/${id}.png`}
                    imageAlt={t(id.toString())}
                    imageDimension={dimension}
                    imageSizes={imageIconSizes}
                    info={getInfo && getInfo(data)}
                  />
                </AnimatedCollapse>
              </button>
          );
        })}
      </Flex>
    </>
  );
};

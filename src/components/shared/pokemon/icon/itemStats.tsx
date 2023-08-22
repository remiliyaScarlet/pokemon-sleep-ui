import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonProducingRate} from '@/components/shared/pokemon/rate/main';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {ProducingRateOfItem} from '@/types/game/producing/rate';


type Props = {
  data: PokemonInfo[],
  getProducingRate: (pokemon: PokemonInfo) => ProducingRateOfItem | null,
  getIcon: (pokemon: PokemonInfo) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
};

export const PokemonIconsItemStats = ({data, getProducingRate, getIcon, targetSpecialty}: Props) => {
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  if (!data.length) {
    return (
      <div className="p-1.5">
        <UnavailableIcon/>
      </div>
    );
  }

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Grid className="grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data
          .map((pokemon) => ({
            pokemon,
            rate: getProducingRate(pokemon),
          }))
          .sort((a, b) => (b.rate?.dailyEnergy ?? 0) - (a.rate?.dailyEnergy ?? 0))
          .map(({pokemon, rate}) => {
            const {id, specialty} = pokemon;

            return (
              <Flex key={id} direction="col" className="button-clickable-bg relative">
                <Flex direction="col" noFullWidth className="absolute bottom-1 right-1 z-10">
                  <PokemonProducingRate
                    simplified
                    rate={rate}
                    icon={getIcon(pokemon)}
                  />
                </Flex>
                <button className="button-clickable" onClick={() => showPokemon(pokemon)}>
                  <Flex direction="row" className="h-full items-center gap-1.5 p-1.5 opacity-70">
                    <IconWithInfo
                      imageSrc={`/images/pokemon/icons/${id}.png`}
                      imageAlt={t(`PokemonName.${id}`)}
                      imageDimension="h-12 w-12"
                      imageSizes={imageIconSizes}
                      info={specialty === targetSpecialty ?
                        <div className="relative h-4 w-4">
                          <NextImage
                            src="/images/generic/flash.png" alt={t2('Specialty')}
                            sizes={imageSmallIconSizes} className="invert-on-light"
                          />
                        </div> :
                        undefined}
                    />
                  </Flex>
                </button>
              </Flex>
            );
          })}
      </Grid>
    </>
  );
};

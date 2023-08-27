import React from 'react';

import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {isNotNullish} from '@/utils/type';


type Props = PokemonIngredientStatsCommonProps & {
  getProducingRate: (pokemon: PokemonInfo, qty: number) => ProducingRateOfItem | null,
  getIcon: (pokemon: PokemonInfo) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
};

export const PokemonIconsItemStats = ({getProducingRate, getIcon, targetSpecialty, pokedex, dropData}: Props) => {
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  if (!dropData.length) {
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
        {dropData
          .map(({pokemon, qty}) => {
            const pokemonInfo = pokedex[pokemon];

            if (!pokemonInfo) {
              return null;
            }

            const rate = getProducingRate(pokemonInfo, qty);

            return {pokemon: pokemonInfo, rate, qty};
          })
          .filter(isNotNullish)
          .sort((a, b) => (b.rate?.dailyEnergy ?? 0) - (a.rate?.dailyEnergy ?? 0))
          .map(({pokemon, rate, qty}) => {
            if (!pokemon) {
              return <></>;
            }

            const {id, specialty} = pokemon;

            return (
              <AnimatedCollapse key={id} show={qty > 0}>
                <Flex direction="col" className="button-clickable-bg relative">
                  <Flex direction="col" noFullWidth className="absolute bottom-1 right-1 z-10">
                    <PokemonProducingRateSingle
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
              </AnimatedCollapse>
            );
          })}
      </Grid>
    </>
  );
};

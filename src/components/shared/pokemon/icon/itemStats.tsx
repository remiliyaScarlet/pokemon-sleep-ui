import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonProducingRate} from '@/components/shared/pokemon/rate/main';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/mongo/pokemon';
import {classNames} from '@/utils/react';


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
      <Flex direction="row" wrap className="gap-1.5">
        {data
          .map((pokemon) => ({
            pokemon,
            rate: getProducingRate(pokemon),
          }))
          .sort((a, b) => (b.rate?.dailyEnergy ?? 0) - (a.rate?.dailyEnergy ?? 0))
          .map(({pokemon, rate}) => {
            const {id, specialty} = pokemon;

            return (
              <Flex key={id} direction="col" className={classNames(
                'relative button-clickable-bg',
                'width-with-gap-sm width-with-gap-2-items sm:width-with-gap-3-items',
                'md:width-with-gap-4-items lg:width-with-gap-5-items xl:width-with-gap-6-items',
              )}>
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
      </Flex>
    </>
  );
};

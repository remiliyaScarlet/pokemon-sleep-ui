import React from 'react';

import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {usePokemonProducingStats} from '@/components/shared/pokemon/icon/itemStats/worker/hook';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {usePokemonProducingRateSingleDisplay} from '@/components/shared/pokemon/production/single/hook';
import {PokemonProducingRateSingleDisplaySwitch} from '@/components/shared/pokemon/production/single/input';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single/main';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {Dimension} from '@/types/style';
import {isNotNullish} from '@/utils/type';


type Props = PokemonItemStatsWorkerOpts & {
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateOfStates | undefined,
  getIcon: (pokemon: PokemonInfo, dimension: Dimension) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
  itemAlt: string,
  itemImageSrc: string,
  isProductionIncluded?: (productions: IngredientProduction[]) => boolean,
};

export const PokemonIconsItemStats = ({
  getItemRate,
  getIcon,
  targetSpecialty,
  itemAlt,
  itemImageSrc,
  isProductionIncluded,
  ...props
}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const producingStats = usePokemonProducingStats({
    setLoading,
    ...props,
  });
  const control = usePokemonProducingRateSingleDisplay();

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  const filteredStats = producingStats
    .map((stats) => {
      const itemRate = getItemRate(stats.pokemonRate);
      if (!itemRate) {
        return null;
      }

      return {...stats, itemRate};
    })
    .filter(isNotNullish)
    .sort((a, b) => (
      b.itemRate.quantity.equivalent - a.itemRate.quantity.equivalent
    ));

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <LazyLoad loading={loading} className="gap-1.5">
        <PokemonProducingRateSingleDisplaySwitch
          control={control}
          itemAlt={itemAlt}
          itemImageSrc={itemImageSrc}
        />
        <Grid className="grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredStats.map(({
            pokemon,
            identifier,
            ingredients,
            dailyTotalEnergy,
            itemRate,
          }) => {
            const {id, specialty} = pokemon;

            return (
              <AnimatedCollapse
                key={`${id}-${identifier}`}
                show={isProductionIncluded ? isProductionIncluded(ingredients) : true}
                appear
              >
                <Flex className="button-clickable-bg group relative">
                  <Flex noFullWidth className="absolute bottom-1 right-1 z-10">
                    <PokemonProducingRateSingle
                      rate={itemRate}
                      display={control.display}
                      getIcon={(dimension) => getIcon(pokemon, dimension)}
                      infoAtTotal={<PokemonIngredientIcons key="ingredients" ingredients={[ingredients]} noLink/>}
                      dailyTotalEnergy={dailyTotalEnergy}
                    />
                  </Flex>
                  <button className="button-clickable" onClick={() => showPokemon(pokemon)}>
                    <Flex direction="row" className="h-full items-center gap-1.5 p-1.5 opacity-70">
                      <IconWithInfo
                        imageSrc={`/images/pokemon/icons/${id}.png`}
                        imageAlt={t(`PokemonName.${id}`)}
                        imageDimension="h-12 w-12"
                        imageSizes={imageIconSizes}
                        info={
                          specialty === targetSpecialty &&
                          <div className="relative h-4 w-4">
                            <NextImage
                              src="/images/generic/flash.png" alt={t2('Specialty')}
                              sizes={imageSmallIconSizes} className="invert-on-light"
                            />
                          </div>
                        }
                      />
                    </Flex>
                  </button>
                </Flex>
              </AnimatedCollapse>
            );
          })}
        </Grid>
      </LazyLoad>
    </>
  );
};

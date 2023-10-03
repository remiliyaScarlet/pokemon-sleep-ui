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
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingRate, ProducingRateOfItem} from '@/types/game/producing/rate';
import {isNotNullish} from '@/utils/type';


type Props = PokemonItemStatsWorkerOpts & {
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateOfItem | undefined,
  getIcon: (pokemon: PokemonInfo) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
  isProductionIncluded?: (productions: IngredientProduction[]) => boolean,
};

export const PokemonIconsItemStats = ({
  getItemRate,
  getIcon,
  targetSpecialty,
  isProductionIncluded,
  ...props
}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const producingStats = usePokemonProducingStats({
    setLoading,
    ...props,
  });

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
    .sort((a, b) => b.itemRate.quantity - a.itemRate.quantity);

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <LazyLoad loading={loading}>
        <Grid className="grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
                <Flex className="button-clickable-bg relative">
                  <Flex noFullWidth className="absolute bottom-1 right-1 z-10">
                    <PokemonProducingRateSingle
                      rate={itemRate}
                      icon={getIcon(pokemon)}
                      additionalContents={[
                        <PokemonIngredientIcons key="ingredients" ingredients={[ingredients]} noLink/>,
                      ]}
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

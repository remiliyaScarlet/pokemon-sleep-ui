import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonProducingStats} from '@/components/shared/pokemon/icon/type';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokedexMap, PokemonInfo, PokemonIngredientProduction, PokemonSpecialtyId} from '@/types/game/pokemon';
import {IngredientChain, IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {isNotNullish} from '@/utils/type';


type Props = {
  pokedex: PokedexMap,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  ingredientChainMap: IngredientChainMap,
  getProducingStats: (pokemon: PokemonInfo, chain: IngredientChain) => PokemonProducingStats[],
  getIcon: (pokemon: PokemonInfo) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
};

export const PokemonIconsItemStats = ({
  pokedex,
  pokemonIngredientProduction,
  ingredientChainMap,
  getProducingStats,
  getIcon,
  targetSpecialty,
}: Props) => {
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <Grid className="grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {pokemonIngredientProduction
          .flatMap(({pokemonId, ingredientChainId}) => {
            const pokemon = pokedex[pokemonId];

            if (!pokemon) {
              return null;
            }

            const chain = ingredientChainMap[ingredientChainId];

            if (!chain) {
              return null;
            }

            return getProducingStats(pokemon, chain)
              .map((stats) => ({pokemon, stats}));
          })
          .filter(isNotNullish)
          .sort((a, b) => (
            (b.stats.rate.dailyEnergy ?? 0) - (a.stats.rate.dailyEnergy ?? 0)
          ))
          .map(({pokemon, stats}) => {
            const {id, specialty} = pokemon;
            const {rate, identifier} = stats;

            return (
              <Flex key={`${id}-${identifier}`} direction="col" className="button-clickable-bg relative">
                <Flex direction="col" noFullWidth className="absolute bottom-1 right-1 z-10">
                  <PokemonProducingRateSingle
                    rate={rate}
                    icon={getIcon(pokemon)}
                    additionalContents={[
                      <PokemonIngredientIcons key="ingredients" ingredients={[ingredients]} noLink/>,
                    ]}
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
            );
          })}
      </Grid>
    </>
  );
};

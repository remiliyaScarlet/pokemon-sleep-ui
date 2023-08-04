import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonProducingRate} from '@/components/shared/pokemon/rate/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {classNames} from '@/utils/react';


type Props = {
  data: PokemonInfo[],
  level: number,
  ingredientMap: IngredientMap,
};

export const PokemonIconsWithIngredient = ({data, level, ingredientMap}: Props) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  if (!data.length) {
    return (
      <div className="p-1.5">
        <div className="relative h-12 w-12">
          <NextImage src="/images/generic/pokeball_unavailable.png" alt="N/A" sizes={imageSmallIconSizes}/>
        </div>
      </div>
    );
  }

  return (
    <Flex direction="row" wrap className="gap-1.5">
      {data
        .map((pokemon) => ({
          pokemon,
          rate: getIngredientProducingRate({
            level,
            pokemon,
            ...defaultNeutralOpts,
            ingredientMap,
          }),
        }))
        .sort((a, b) => (b.rate?.quantity ?? 0) - (a.rate?.quantity ?? 0))
        .map(({pokemon, rate}) => {
          const {id, ingredients, specialty} = pokemon;

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
                  icon={ingredients.fixed ?
                    <NextImage
                      src={`/images/ingredient/${ingredients.fixed}.png`}
                      alt={t(`Food.${ingredients.fixed}`)}
                      sizes={imageSmallIconSizes}
                    /> :
                    <XCircleIcon/>}
                />
              </Flex>
              <Link href={`/pokedex/${id}`} className="button-clickable">
                <Flex direction="row" className="h-full items-center gap-1.5 p-1.5">
                  <IconWithInfo
                    imageSrc={`/images/pokemon/icons/${id}.png`}
                    imageAlt={t(`PokemonName.${id}`)}
                    imageDimension="h-12 w-12"
                    imageSizes={imageIconSizes}
                    info={specialty === specialtyIdMap.ingredient ?
                      <div className="relative h-4 w-4">
                        <NextImage
                          src="/images/generic/flash.png" alt={t2('Specialty')}
                          sizes={imageSmallIconSizes} className="invert-on-light"
                        />
                      </div> :
                      undefined}
                  />
                </Flex>
              </Link>
            </Flex>
          );
        })}
    </Flex>
  );
};

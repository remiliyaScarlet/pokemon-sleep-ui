import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter, VerticalSplitter} from '@/components/shared/common/splitter';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {imageSmallIconSizes} from '@/styles/image';
import {specialtyIdMap} from '@/types/game/pokemon';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {PokemonProductionRate} from '@/ui/pokedex/page/common/productionRate';
import {PokemonIngredientLink} from '@/ui/pokedex/page/meta/ingredientLink';
import {getPokemonIngredientProductionRate} from '@/utils/game/pokemon';


type Props = {
  pokemon: PokemonInfo,
  ingredientMap: IngredientMap,
};

export const PokemonIngredientMeta = ({pokemon, ingredientMap}: Props) => {
  const t = useTranslations('Game.Food');

  const {ingredients, stats, specialty} = pokemon;

  const rate = getPokemonIngredientProductionRate({
    frequency: stats.frequency,
    ingredientData: ingredients.fixed ? ingredientMap[ingredients.fixed] : undefined,
    isSpecialized: specialty === specialtyIdMap.ingredient,
  });

  return (
    <Flex direction="col" className="gap-1">
      <Flex direction="row" className="justify-center gap-1">
        <Flex direction="col" center noFullWidth className="gap-1">
          <div className="h-5 w-5">
            <IngredientTypeIcon type="fixed"/>
          </div>
          <PokemonIngredientLink id={ingredients.fixed}/>
        </Flex>
        <VerticalSplitter/>
        <Flex direction="col" center noFullWidth className="gap-1">
          <div className="h-5 w-5">
            <IngredientTypeIcon type="random"/>
          </div>
          <Flex direction="row" className="gap-1">
            {ingredients.random ?
              ingredients.random.map((ingredient) => (
                <PokemonIngredientLink key={ingredient} id={ingredient}/>
              )) :
              <PokemonIngredientLink id={undefined}/>}
          </Flex>
        </Flex>
      </Flex>
      <HorizontalSplitter/>
      {
        ingredients.fixed &&
        <>
          <PokemonProductionRate dailyRate={rate.dailyEnergy}/>
          <PokemonProductionRate
            dailyRate={rate.quantity}
            icon={
              <NextImage src={`/images/ingredient/${ingredients.fixed}.png`}
                alt={t(ingredients.fixed.toString())}
                sizes={imageSmallIconSizes}
              />
            }
          />
        </>
      }
    </Flex>
  );
};

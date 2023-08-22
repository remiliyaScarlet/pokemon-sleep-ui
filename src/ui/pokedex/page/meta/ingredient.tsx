import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter, VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientTypeIcon} from '@/components/shared/pokemon/ingredients/typeIcon';
import {PokemonProducingRate} from '@/components/shared/pokemon/rate/main';
import {imageSmallIconSizes} from '@/styles/image';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonIngredientLink} from '@/ui/pokedex/page/meta/ingredientLink';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';


type Props = {
  pokemon: PokemonInfo,
  level: number,
  ingredientMap: IngredientMap,
};

export const PokemonIngredientMeta = ({pokemon, level, ingredientMap}: Props) => {
  const {ingredients} = pokemon;

  const t = useTranslations('Game.Food');

  const rate = getIngredientProducingRate({
    level,
    pokemon,
    ingredient: ingredients.fixed ? ingredientMap[ingredients.fixed] : undefined,
    ...defaultNeutralOpts,
  });

  return (
    <Flex direction="col" className="gap-1">
      <Flex direction="row" className="justify-center gap-1">
        <Flex direction="col" center noFullWidth className="gap-1">
          <div className="h-5 w-5">
            <PokemonIngredientTypeIcon type="fixed"/>
          </div>
          <PokemonIngredientLink id={ingredients.fixed}/>
        </Flex>
        <VerticalSplitter/>
        <Flex direction="col" center noFullWidth className="gap-1">
          <div className="h-5 w-5">
            <PokemonIngredientTypeIcon type="random"/>
          </div>
          <Flex direction="row" center wrap className="gap-1">
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
        <PokemonProducingRate
          rate={rate}
          icon={
            <NextImage
              src={`/images/ingredient/${ingredients.fixed}.png`}
              alt={t(ingredients.fixed.toString())}
              sizes={imageSmallIconSizes}
            />
          }
        />
      }
    </Flex>
  );
};

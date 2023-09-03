import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsIngredientStats} from '@/components/shared/pokemon/icon/ingredientStats';
import {PokemonIngredientLevelIcon} from '@/components/shared/pokemon/ingredients/levelIcon';
import {useEffectiveBonus} from '@/hooks/userData/settings';
import {imageIconSizes} from '@/styles/image';
import {MealCommonProps, MealPokemonOfIngredientLevelProps} from '@/ui/meal/page/type';


type Props = MealCommonProps & {
  pokemonLevel: number,
  pokemonOfIngredientLevel: MealPokemonOfIngredientLevelProps,
};

export const MealPokemonOfIngredientLevel = ({
  meal,
  ingredientMap,
  pokedex,
  pokemonLevel,
  pokemonOfIngredientLevel,
  preloadedSettings,
}: Props) => {
  const {ingredientLevel, pokeIngredientMap, show} = pokemonOfIngredientLevel;
  const {data} = useSession();
  const bonus = useEffectiveBonus({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  const t = useTranslations('Game.Food');

  return (
    <AnimatedCollapse show={show}>
      <Flex direction="col" center className="info-section">
        <div className="h-8 w-8">
          <PokemonIngredientLevelIcon level={ingredientLevel}/>
        </div>
        {meal.ingredients.map(({id, quantity}) => (
          <Flex key={id} direction="row" className="gap-2">
            <Link href={`/ingredient/${id}`} className="button-clickable-bg">
              <Flex direction="col" center className="h-full">
                <div className="relative h-12 w-12">
                  <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
                </div>
                <div>{quantity}</div>
              </Flex>
            </Link>
            <Flex direction="col" center className={clsx(
              'border-button-clickable rounded-r-lg border-y-2 border-r-2 py-2 pr-2',
            )}>
              <PokemonIconsIngredientStats
                level={pokemonLevel}
                pokedex={pokedex}
                dropData={pokeIngredientMap[id] ?? []}
                ingredient={ingredientMap[id]}
                bonus={bonus}
              />
            </Flex>
          </Flex>
        ))}
        <AdsUnit/>
      </Flex>
    </AnimatedCollapse>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {imageSmallIconSizes} from '@/styles/image';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {formatFloat} from '@/utils/number';


export const PokedexLinkDetail = React.memo(({
  pokemon,
  display,
  level,
  ingredientMap,
  berryMap,
}: PokedexLinkProps) => {
  const {id, berry, skill, ingredients, specialty, stats} = pokemon;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  if (display === 'berry') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <NextImage src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)} sizes={imageSmallIconSizes}/>
        </div>
        <div>
          {berry.quantity}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkill') {
    return (
      <div className="text-xs">
        {t(`MainSkill.Name.${skill}`)}
      </div>
    );
  }

  if (display === 'ingredient') {
    return <PokemonIngredientIcons ingredients={ingredients}/>;
  }

  if (display === 'specialty') {
    return (
      <Flex direction="row">
        <PokemonSpecialty specialty={specialty}/>
      </Flex>
    );
  }

  if (display === 'friendshipPoint') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <NextImage src="/images/generic/friendship.png" alt={t2('Stats.Friendship')} sizes={imageSmallIconSizes}/>
        </div>
        <div>
          {stats.friendshipPoints}
        </div>
      </Flex>
    );
  }

  if (display === 'id') {
    return (
      <div className="text-xs">
        #{id}
      </div>
    );
  }

  if (display === 'ingredientEnergy' || display === 'ingredientCount') {
    const fixedIngredientId = ingredients.fixed;

    if (!fixedIngredientId) {
      return <></>;
    }

    const rate = getIngredientProducingRate({
      level,
      pokemon,
      ...defaultNeutralOpts,
      ingredientMap,
    });

    if (display === 'ingredientEnergy') {
      return (
        <Flex direction="row" className="gap-0.5">
          <div className="relative h-5 w-5">
            <NextImage
              src={`/images/ingredient/${fixedIngredientId}.png`} alt={t(`Food.${fixedIngredientId}`)}
              sizes={imageSmallIconSizes}
            />
          </div>
          <div className="relative h-5 w-5">
            <NextImage src="/images/generic/energy.png" alt={t2('Stats.Energy.Name')} sizes={imageSmallIconSizes}/>
          </div>
          <div>
            {formatFloat(rate?.dailyEnergy)}
          </div>
        </Flex>
      );
    }

    if (display === 'ingredientCount') {
      return (
        <Flex direction="row" className="gap-0.5">
          <div className="relative h-5 w-5">
            <NextImage
              src={`/images/ingredient/${fixedIngredientId}.png`} alt={t(`Food.${fixedIngredientId}`)}
              sizes={imageSmallIconSizes}
            />
          </div>
          <div>
            {formatFloat(rate?.quantity)}
          </div>
        </Flex>
      );
    }
  }


  if (display === 'berryEnergy' || display === 'berryCount') {
    const rate = getBerryProducingRate({
      level,
      pokemon,
      ...defaultNeutralOpts,
      isSnorlaxFavorite: false,
      berryData: berryMap[berry.id],
    });

    if (display === 'berryEnergy') {
      return (
        <Flex direction="row" className="gap-0.5">
          <div className="relative h-5 w-5">
            <NextImage
              src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)}
              sizes={imageSmallIconSizes}
            />
          </div>
          <div className="relative h-5 w-5">
            <NextImage src="/images/generic/energy.png" alt={t2('Stats.Energy.Name')} sizes={imageSmallIconSizes}/>
          </div>
          <div>
            {formatFloat(rate?.dailyEnergy)}
          </div>
        </Flex>
      );
    }

    if (display === 'berryCount') {
      return (
        <Flex direction="row" className="gap-0.5">
          <div className="relative h-5 w-5">
            <NextImage
              src={`/images/berry/${berry.id}.png`} alt={t(`Berry.${berry.id}`)}
              sizes={imageSmallIconSizes}
            />
          </div>
          <div>
            {formatFloat(rate?.quantity)}
          </div>
        </Flex>
      );
    }
  }
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';

import React from 'react';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
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
        <PokemonBerryIcon id={berry.id}/>
        <div>
          {berry.quantity}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkill') {
    return (
      <div className="text-sm">
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

  if (display === 'frequency') {
    return (
      <Flex direction="row" className="items-center gap-1">
        <div className="h-5 w-5">
          <ClockIcon/>
        </div>
        <div>
          {stats.frequency}
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
          <PokemonIngredientIcon id={fixedIngredientId}/>
          <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
          <div>
            {formatFloat(rate?.dailyEnergy)}
          </div>
        </Flex>
      );
    }

    if (display === 'ingredientCount') {
      return (
        <Flex direction="row" className="gap-0.5">
          <PokemonIngredientIcon id={fixedIngredientId}/>
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
          <PokemonBerryIcon id={berry.id}/>
          <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
          <div>
            {formatFloat(rate?.dailyEnergy)}
          </div>
        </Flex>
      );
    }

    if (display === 'berryCount') {
      return (
        <Flex direction="row" className="gap-0.5">
          <PokemonBerryIcon id={berry.id}/>
          <div>
            {formatFloat(rate?.quantity)}
          </div>
        </Flex>
      );
    }
  }

  if (display === 'totalEnergy') {
    const rateOfBerry = getBerryProducingRate({
      level,
      pokemon,
      ...defaultNeutralOpts,
      isSnorlaxFavorite: false,
      berryData: berryMap[berry.id],
    });

    const rateOfIngredient = getIngredientProducingRate({
      level,
      pokemon,
      ...defaultNeutralOpts,
      ingredientMap,
    });

    return (
      <Flex direction="row" className="gap-0.5">
        <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
        <div>
          {formatFloat(rateOfBerry.dailyEnergy + (rateOfIngredient?.dailyEnergy ?? 0))}
        </div>
      </Flex>
    );
  }

  console.error(`Unhandled Pokedex display type: [${display satisfies never}]`);
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';

import React from 'react';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {getPokemonSorter} from '@/components/shared/pokemon/sorter/calc';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {imageSmallIconSizes} from '@/styles/image';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {formatFloat} from '@/utils/number';


export const PokedexLinkDetail = React.memo(({
  pokemon,
  display,
  level,
  ingredients,
  ingredientMap,
  berryMap,
  snorlaxFavorite,
  bonus,
}: PokedexLinkProps) => {
  const {
    id,
    berry,
    skill,
    specialty,
    sleepType,
  } = pokemon;

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
    return <PokemonIngredientIcons ingredients={[ingredients]}/>;
  }

  if (display === 'sleepType') {
    return (
      <Flex direction="row">
        <PokemonSleepType sleepType={sleepType}/>
      </Flex>
    );
  }

  if (display === 'specialty') {
    return (
      <Flex direction="row">
        <PokemonSpecialty specialty={specialty}/>
      </Flex>
    );
  }

  // Need to calculate here because display and sort could be different
  const sorter = getPokemonSorter({
    type: display,
    pokemon,
    berryDataMap: berryMap,
    ingredientMap,
    ingredients,
    level,
    snorlaxFavorite,
    bonus,
    ...defaultNeutralOpts,
  });

  if (display === 'friendshipPoint') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <NextImage src="/images/generic/friendship.png" alt={t2('Stats.Friendship')} sizes={imageSmallIconSizes}/>
        </div>
        <div>
          {sorter}
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
          {sorter}
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

  if (display === 'ingredientEnergy') {
    return (
      <Flex direction="col">
        <div className="text-xs">
          <PokemonIngredientIcons ingredients={[ingredients]} dimension="h-4 w-4"/>
        </div>
        <Flex direction="row" className="gap-0.5">
          <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
          <div>
            {formatFloat(sorter)}
          </div>
        </Flex>
      </Flex>
    );
  }

  if (display === 'ingredientCount') {
    const rates = getIngredientProducingRates({
      ingredientMap,
      ingredients,
      level,
      pokemon,
      bonus,
      ...defaultNeutralOpts,
    });

    return (
      <Flex direction="col">
        <div className="text-xs">
          <PokemonIngredientIcons ingredients={[ingredients]} dimension="h-4 w-4"/>
        </div>
        <PokemonIngredientIcons
          ingredients={[rates
            .sort((a, b) => b.quantity - a.quantity)
            .map(({id, quantity}) => ({
              id,
              qty: parseFloat(formatFloat(quantity) || '-'),
            })),
          ]}
        />
      </Flex>
    );
  }

  if (display === 'berryEnergy' || display === 'berryCount') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokemonBerryIcon id={berry.id}/>
        {display === 'berryEnergy' && <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>}
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'totalEnergy') {
    return (
      <Flex direction="row" className="gap-0.5">
        <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  console.error(`Unhandled Pokedex display type: [${display satisfies never}]`);
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';

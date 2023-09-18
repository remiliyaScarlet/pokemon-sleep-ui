import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonFrequencySingle} from '@/components/shared/pokemon/frequency/single';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {getPokemonSorter} from '@/components/shared/pokemon/sorter/calc';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {defaultNeutralOpts} from '@/const/game/production';
import {imageSmallIconSizes} from '@/styles/image';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {formatFloat} from '@/utils/number';


export const PokedexLinkDetail = React.memo(({
  pokemon,
  pokemonProducingParams,
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
    stats,
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

  if (display === 'frequency') {
    return (
      <Flex direction="row">
        <PokemonFrequencySingle frequency={stats.frequency}/>
      </Flex>
    );
  }

  // Need to calculate here because display and sort could be different
  const sorter = getPokemonSorter({
    type: display,
    pokemon,
    pokemonProducingParams,
    berryDataMap: berryMap,
    ingredientMap,
    ingredients,
    level,
    snorlaxFavorite,
    bonus,
    dateAdded: null,
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

  if (display === 'frequencyOfBerry' || display === 'frequencyOfIngredient') {
    return (
      <Flex direction="row">
        <PokemonFrequencySingle frequency={sorter}/>
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
      level,
      pokemon,
      pokemonProducingParams,
      ingredientMap,
      ingredients,
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

  if (display === 'dateAdded') {
    return <></>;
  }

  console.error(`Unhandled Pokedex display type: [${display satisfies never}]`);
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';

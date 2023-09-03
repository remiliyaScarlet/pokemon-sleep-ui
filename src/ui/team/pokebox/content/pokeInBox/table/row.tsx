import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxTableRowHeader} from '@/ui/team/pokebox/content/pokeInBox/table/header';
import {PokeInBoxRatingInRow} from '@/ui/team/pokebox/content/pokeInBox/table/rating';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number';


export const PokeInBoxTableRow = (props: PokeInBoxViewUnitProps) => {
  const {
    pokeInBox,
    pokedexMap,
    displayType,
    onClick,
    subSkillMap,
  } = props;
  const {
    pokemon: pokemonId,
    nature,
    subSkill,
    ingredients,
  } = pokeInBox;
  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  if (!pokemon) {
    return <></>;
  }

  const {
    sleepType,
    specialty,
    berry,
  } = pokemon;

  const pokeInBoxProps: PokeInBoxCommonProps = {
    ...props,
    pokemon,
    displayType,
  };

  const rateOfBerry = getRateOfBerry(pokeInBoxProps);
  const rateOfIngredients = getRateOfIngredients(pokeInBoxProps);

  return (
    <Flex direction="row" className="gap-1">
      {/* `pokemon` comes later because `props` from upstream could contain `pokemon` as list of Pokémon */}
      <PokeInBoxTableRowHeader {...props} pokemon={pokemon}/>
      <button className="button-clickable-bg group rounded-lg p-1" onClick={onClick}>
        <Flex direction="row" noFullWidth className="items-center gap-1 [&>*]:shrink-0">
          <InfoIcon>
            {pokeInBox.level}
          </InfoIcon>
          <div className="w-64">
            <PokeInBoxMeta {...pokeInBoxProps}/>
          </div>
          {/* Info */}
          <PokemonSleepTypeIcon sleepType={sleepType} dimension="h-4 w-4"/>
          <PokemonSpecialtyIcon specialty={specialty} dimension="h-4 w-4"/>
          <Flex
            direction="row" center noFullWidth
            className={clsx('items-center gap-1 px-1', specialty === specialtyIdMap.berry && 'bg-blink')}
          >
            <PokemonBerryIcon id={berry.id}/>
            <div>{berry.quantity}</div>
          </Flex>
          <div className={clsx(
            'rounded-lg px-2',
            specialty === specialtyIdMap.ingredient ? 'bg-blink' : 'border border-slate-500/50',
          )}>
            <PokemonIngredientIcons
              ingredients={[Object.values(ingredients).map((ingredient) => ingredient)]}
            />
          </div>
          {/* Berry */}
          <Flex direction="row" center noFullWidth className={clsx(
            'w-48 gap-1 p-0',
            pokemon.specialty === specialtyIdMap.berry && 'bg-blink',
          )}>
            <PokemonBerryIcon id={pokemon.berry.id}/>
            <div>
              x{formatFloat(rateOfBerry.quantity)}
            </div>
            <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
            <div>
              {formatFloat(rateOfBerry.dailyEnergy)}
            </div>
          </Flex>
          {/* Ingredients */}
          <Flex direction="row" wrap center noFullWidth className={clsx(
            'w-72 gap-x-3 gap-y-0.5 p-0.5 text-xs',
            pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
          )}>
            {rateOfIngredients.map(({id, quantity, dailyEnergy}) => (
              <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
                <PokemonIngredientIcon id={id} dimension="h-3.5 w-3.5"/>
                <div>
                  x{formatFloat(quantity)}
                </div>
                <ColoredEnergyIcon alt={t2('Stats.Energy.Name')} dimension="h-3 w-3"/>
                <div>
                  {formatFloat(dailyEnergy)}
                </div>
              </Flex>
            ))}
          </Flex>
          {/* Total */}
          <Flex direction="row" center noFullWidth className="w-32 gap-0.5 text-lg">
            <ColoredEnergyIcon dimension="h-6 w-6" alt={t2('Stats.Energy.Name')}/>
            <div>
              {formatFloat(
                rateOfBerry.dailyEnergy +
                toSum(rateOfIngredients.map(({dailyEnergy}) => dailyEnergy)),
              )}
            </div>
          </Flex>
          {/* Rating */}
          <Flex direction="col" noFullWidth className="w-52">
            <PokeInBoxRatingInRow {...pokeInBoxProps}/>
          </Flex>
          {/* Stats */}
          <Flex direction="row" center noFullWidth className="w-16 gap-0.5">
            <PokemonDataIcon src="/images/generic/bag.png" alt={t2('Stats.MaxCarry')} invert/>
            <div>{pokeInBox.carryLimit}</div>
          </Flex>
          <Flex direction="row" center noFullWidth className="w-20 gap-0.5">
            <PokemonDataIcon src="/images/generic/clock.png" alt={t2('Stats.Frequency')} invert/>
            <div>{pokemon.stats.frequency}</div>
          </Flex>
          {/* Skills */}
          <Flex direction="row" center noFullWidth className="w-56">
            <PokemonNatureIndicator nature={nature}/>
          </Flex>
          <Flex direction="row" center noFullWidth className="w-36">
            <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
          </Flex>
          <Link href={`/info/mainskill/${pokemon.skill}`} className={clsx(
            'w-60 whitespace-nowrap p-1 text-sm',
            pokemon.specialty === specialtyIdMap.skill && 'bg-blink',
          )}>
            <Flex direction="row" center>
              {t(`MainSkill.Name.${pokemon.skill}`)}
            </Flex>
          </Link>
        </Flex>
      </button>
    </Flex>
  );
};

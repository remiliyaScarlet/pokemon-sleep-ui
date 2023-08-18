import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/grid/details/utils';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number';


export const PokeboxContentPokeInBoxRow = (props: PokeInBoxViewUnitProps) => {
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
    randomIngredient,
  } = pokeInBox;
  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata.Pokedex');
  const t3 = useTranslations('UI.InPage.Pokedex');

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  if (!pokemon) {
    return <></>;
  }

  const {
    sleepType,
    specialty,
    berry,
    ingredients,
  } = pokemon;
  const pokemonName = t(`PokemonName.${pokemonId}`);

  const pokeInBoxProps: PokeboxPokeInBoxCommonProps = {
    ...props,
    pokemon,
    displayType,
  };

  const rateOfBerry = getRateOfBerry(pokeInBoxProps);
  const rateOfIngredients = getRateOfIngredients(pokeInBoxProps);

  return (
    <Flex direction="row" className="gap-1">
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex direction="row" center noFullWidth className={clsx(
        'sticky left-0 z-10 rounded-lg bg-slate-100 p-1',
        'shadow shadow-white dark:bg-slate-800 dark:shadow-black',
      )}>
        <button className="button-clickable group relative h-6 w-6 rounded-full" onClick={() => showPokemon(pokemon)}>
          <GenericPokeballIcon alt={t2('Page.Title', {name: pokemonName})} noWrap/>
        </button>
        <div className="relative h-10 w-10">
          <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
        </div>
      </Flex>
      <button className="button-clickable-bg group rounded-lg p-1" onClick={onClick}>
        <Flex direction="row" noFullWidth className="items-center gap-1 [&>*]:shrink-0">
          <div className="w-72">
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
          <div className={clsx(specialty === specialtyIdMap.ingredient && 'bg-blink')}>
            <PokemonIngredientIcons
              ingredients={{
                fixed: ingredients.fixed,
                random: randomIngredient.map(({id}) => id),
              }}
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
            <ColoredEnergyIcon alt={t3('Stats.Energy.Name')}/>
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
                <ColoredEnergyIcon alt={t3('Stats.Energy.Name')} dimension="h-3 w-3"/>
                <div>
                  {formatFloat(dailyEnergy)}
                </div>
              </Flex>
            ))}
          </Flex>
          {/* Total */}
          <Flex direction="row" center noFullWidth className="w-32 gap-0.5 text-lg">
            <ColoredEnergyIcon dimension="h-6 w-6" alt={t3('Stats.Energy.Name')}/>
            <div>
              {formatFloat(
                rateOfBerry.dailyEnergy +
                  toSum(rateOfIngredients.map(({dailyEnergy}) => dailyEnergy)),
              )}
            </div>
          </Flex>
          {/* Stats */}
          <Flex direction="row" center noFullWidth className="w-16 gap-0.5">
            <PokemonDataIcon src="/images/generic/bag.png" alt={t3('Stats.MaxCarry')} invert/>
            <div>{pokeInBox.carryLimit}</div>
          </Flex>
          <Flex direction="row" center noFullWidth className="w-20 gap-0.5">
            <PokemonDataIcon src="/images/generic/clock.png" alt={t3('Stats.Frequency')} invert/>
            <div>{pokemon.stats.frequency}</div>
          </Flex>
          {/* Skills */}
          <Flex direction="row" center noFullWidth className="w-36">
            <PokemonNatureIndicator nature={nature}/>
          </Flex>
          <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
          <Flex direction="row" center noFullWidth className={clsx(
            'w-60 whitespace-nowrap p-1 text-sm',
            pokemon.specialty === specialtyIdMap.skill && 'bg-blink',
          )}>
            {t(`MainSkill.Name.${pokemon.skill}`)}
          </Flex>
        </Flex>
      </button>
    </Flex>
  );
};

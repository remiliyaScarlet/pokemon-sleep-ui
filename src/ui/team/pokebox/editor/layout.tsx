import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {PokeInBox} from '@/types/game/pokebox';
import {pokemonSubSkillLevel} from '@/types/game/pokemon/subskill';
import {maxCarryLimit} from '@/ui/team/pokebox/editor/const';
import {PokeInBoxEditCommonProps} from '@/ui/team/pokebox/editor/type';


type Props = PokeInBoxEditCommonProps & {
  pokeInBox: PokeInBox,
  setPokeInBox: (newPokeInBox: PokeInBox) => void,
  onCopyPokeInBox: (original: PokeInBox) => void,
};

export const PokeInBoxEditLayout = ({
  pokedexMap,
  ingredientChainMap,
  subSkillMap,
  onRemovePokeInBox,
  pokeInBox,
  setPokeInBox,
  onCopyPokeInBox,
}: Props) => {
  const {
    uuid,
    pokemon: pokemonId,
    name,
    level,
    carryLimit,
    subSkill,
    nature,
  } = pokeInBox;
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return <></>;
  }

  const resetMaxCarry = () => setPokeInBox({
    ...pokeInBox,
    carryLimit: pokemon.stats.maxCarry,
  });

  return (
    <Flex direction="col" className="gap-2 pr-1.5 sm:pr-0">
      <Flex direction="col" center className="gap-1.5 md:flex-row-reverse">
        <pre className="text-sm text-slate-500">
          {uuid}
        </pre>
        <InputBox
          value={name ?? ''}
          type="text"
          placeholder={t(`PokemonName.${pokemonId}`)}
          className="w-full"
          onChange={({target}) => setPokeInBox({
            ...pokeInBox,
            name: target.value || null,
          })}
        />
      </Flex>
      <Flex direction="col">
        <PokemonLevelSlider
          level={level}
          maxLevel={Math.max(...pokemonSubSkillLevel)}
          setLevel={(level) => setPokeInBox({
            ...pokeInBox,
            level,
          })}
        />
      </Flex>
      <PokemonIngredientPicker
        chain={ingredientChainMap[pokemon.ingredientChain]}
        ingredients={pokeInBox.ingredients}
        onSelect={(updated, ingredientLevel) => setPokeInBox({
          ...pokeInBox,
          ingredients: {
            ...pokeInBox.ingredients,
            [ingredientLevel]: updated,
          },
        })}
        idPrefix={pokeInBox.uuid}
      />
      <Flex direction="row" className="items-center justify-end gap-0.5">
        <PokemonDataIcon src="/images/generic/bag.png" alt={t2('Stats.MaxCarry')} invert/>
        <InputBox
          type="number"
          value={carryLimit.toString()}
          className="w-20 text-center"
          onChange={({target}) => {
            const carryLimit = parseInt(target.value);

            setPokeInBox({
              ...pokeInBox,
              carryLimit: isNaN(carryLimit) ? 0 : Math.min(carryLimit, maxCarryLimit),
            });
          }}
        />
        <button className="button-clickable-bg !rounded-full p-1" onClick={resetMaxCarry}>
          <div className="h-5 w-5">
            <ArrowPathIcon/>
          </div>
        </button>
      </Flex>
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <Flex direction="col" className="h-8">
          <PokemonSubSkillSelector
            subSkill={subSkill}
            subSkillMap={subSkillMap}
            setSubSkill={(subSkill) => setPokeInBox({
              ...pokeInBox,
              subSkill,
            })}
          />
        </Flex>
        <Flex direction="col" className="h-8">
          <PokemonNatureSelector
            nature={nature}
            setNature={(nature) => setPokeInBox({
              ...pokeInBox,
              nature,
            })}
          />
        </Flex>
      </Flex>
      <HorizontalSplitter/>
      <Flex direction="row" className="items-center">
        <button className="button-clickable-bg !rounded-full p-1" onClick={() => onCopyPokeInBox(pokeInBox)}>
          <div className="h-5 w-5">
            <DocumentDuplicateIcon/>
          </div>
        </button>
        <button
          className="transform-smooth ml-auto rounded-full bg-red-500/40 p-1 hover:bg-red-500"
          onClick={() => onRemovePokeInBox(uuid)}
        >
          <div className="h-5 w-5">
            <TrashIcon/>
          </div>
        </button>
      </Flex>
    </Flex>
  );
};

import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {PokeInBox} from '@/types/game/pokebox';
import {pokemonSubSkillLevel, SubSkillMap} from '@/types/game/pokemon/subskill';
import {PokedexMap} from '@/types/mongo/pokemon';
import {maxCarryLimit} from '@/ui/team/pokebox/content/edit/const';
import {PokeboxPokeInBoxIngredientEditor} from '@/ui/team/pokebox/content/edit/ingredient';
import {PokeboxPokeInBoxUpdateCommonProps} from '@/ui/team/pokebox/content/edit/type';


type Props = {
  idx: number | undefined,
  pokeInBox: PokeInBox,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  setPokeInBox: (newPokeInBox: PokeInBox) => void,
  onRemovePokeInBox: () => void,
  onCopyPokeInBox: () => void,
};

export const PokeboxPokeInBoxUpdateLayout = ({
  idx,
  pokeInBox,
  pokedexMap,
  subSkillMap,
  setPokeInBox,
  onRemovePokeInBox,
  onCopyPokeInBox,
}: Props) => {
  const {
    id,
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

  const props: PokeboxPokeInBoxUpdateCommonProps = {
    pokeInBox,
    pokeInBoxUiId: pokeInBox.id ?? idx?.toString() ?? '(placeholder)',
    setPokeInBox,
    pokemon,
  };

  return (
    <Flex direction="col" className="gap-2 pr-1.5 sm:pr-0">
      <Flex direction="col" center className="gap-1.5 md:flex-row-reverse">
        <pre className="text-sm text-slate-500">
          {id}
        </pre>
        <InputBox
          value={name ?? ''}
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
      <PokeboxPokeInBoxIngredientEditor {...props}/>
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <Flex direction="col" className="h-8">
          <PokemonNatureSelector
            nature={nature}
            setNature={(nature) => setPokeInBox({
              ...pokeInBox,
              nature,
            })}
          />
        </Flex>
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
      </Flex>
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
      <HorizontalSplitter/>
      <Flex direction="row" className="items-center">
        <button className="button-clickable-bg !rounded-full p-1" onClick={onCopyPokeInBox}>
          <div className="h-5 w-5">
            <DocumentDuplicateIcon/>
          </div>
        </button>
        <button
          className="transform-smooth ml-auto rounded-full bg-red-500/40 p-1 hover:bg-red-500"
          onClick={onRemovePokeInBox}
        >
          <div className="h-5 w-5">
            <TrashIcon/>
          </div>
        </button>
      </Flex>
    </Flex>
  );
};

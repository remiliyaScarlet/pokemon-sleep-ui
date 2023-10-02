import React from 'react';

import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonCarryLimitInput} from '@/components/shared/pokemon/carryLimit/input';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {imageSmallIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox';
import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {maxCarryLimit} from '@/ui/team/pokebox/editor/const';
import {PokeInBoxEditCommonProps, PokeInBoxEditStateProps} from '@/ui/team/pokebox/editor/type';


type Props = PokeInBoxEditCommonProps & PokeInBoxEditStateProps & {
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
    isShiny,
  } = pokeInBox;
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return <></>;
  }

  const isShinyActive = isShiny ?? false;

  return (
    <Flex direction="col" className="gap-2">
      <Flex direction="col" className="gap-1.5 truncate md:flex-row-reverse md:items-center">
        <pre className="text-sm text-slate-500">
          {uuid}
        </pre>
        <Flex direction="row" className="gap-1.5">
          <ToggleButton
            id="markPokeInBoxShiny"
            active={isShinyActive}
            onClick={() => setPokeInBox({
              ...pokeInBox,
              isShiny: !pokeInBox.isShiny,
            })}
            className={clsx('group rounded-lg p-1', getToggleButtonClass(isShiny ?? false))}
          >
            <div className="group relative h-5 w-5">
              <NextImage
                src="/images/generic/flash.png" alt={t2('Shiny')}
                sizes={imageSmallIconSizes} className={isShinyActive ? 'invert-on-dark' : 'invert-on-light'}
              />
            </div>
          </ToggleButton>
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
      </Flex>
      <PokemonEvolutionSelector
        pokemon={pokemon}
        pokedex={pokedexMap}
        onClick={(pokemon) => setPokeInBox({...pokeInBox, pokemon})}
      />
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
      <PokemonCarryLimitInput
        carryLimit={carryLimit}
        setCarryLimit={(carryLimit) => setPokeInBox({
          ...pokeInBox,
          carryLimit: isNaN(carryLimit) ? 0 : Math.min(carryLimit, maxCarryLimit),
        })}
        defaultCarryLimit={pokemon.stats.maxCarry}
      />
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
          className="transform-smooth button-alert-bg ml-auto rounded-full p-1"
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

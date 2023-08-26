import React from 'react';

import CalculatorIcon from '@heroicons/react/24/outline/CalculatorIcon';

import {Flex} from '@/components/layout/flex';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {PokemonId} from '@/types/game/pokemon';
import {RatingSetupData} from '@/ui/rating/setup/type';
import {generateRatingSetup} from '@/ui/rating/setup/utils';
import {RatingDataProps} from '@/ui/rating/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type Props = RatingDataProps & {
  pokemonId: PokemonId | undefined,
  onInitiate: (setup: RatingSetupData) => void,
};

export const RatingSetup = ({
  pokemonId,
  onInitiate,
  pokedex,
  pokedexMap,
  ingredientChainMap,
  subSkillMap,
  mapMeta,
  pokemonMaxLevel,
}: Props) => {
  const pokemon = pokemonId ? pokedexMap[pokemonId] : undefined;
  const [setup, setSetup] = React.useState<RatingSetupData>();

  React.useEffect(() => {
    if (!pokemon) {
      return;
    }

    const chain = ingredientChainMap[pokemon.ingredientChain];
    setSetup((setup) => {
      if (!setup) {
        return generateRatingSetup({chain});
      }

      return {
        ...setup,
        ingredients: generateIngredientProductionAtLevels(chain),
      };
    });
  }, [!!pokemon]);

  if (!pokemon || !setup) {
    return (
      <Flex direction="col" center>
        <UnavailableIcon/>
      </Flex>
    );
  }

  const {ingredientChain} = pokemon;
  const {level, ingredients, subSkill, nature} = setup;
  const chain = ingredientChainMap[ingredientChain];

  return (
    <Flex direction="col" center className="gap-1.5">
      <PokemonNameBig pokemon={pokemon}/>
      <div className="relative h-48 w-48">
        <PokemonImage pokemon={pokemon} image="portrait" isShiny={false}/>
      </div>
      <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={(level) => setSetup({
        ...setup,
        level,
      })}/>
      <SnorlaxFavoriteInput
        mapMeta={mapMeta}
        pokemon={pokedex}
        filter={setup}
        setFilter={(setup) => setSetup(setup)}
        filterKey="snorlaxFavorite"
      />
      <PokemonIngredientPicker
        chain={chain}
        ingredients={ingredients}
        idPrefix={pokemon.id.toString()}
        onSelect={(production, level) => setSetup({
          ...setup,
          ingredients: {
            ...setup?.ingredients,
            [level]: production,
          },
        })}
      />
      <Flex direction="row" className="h-8 gap-1.5">
        <PokemonSubSkillSelector
          subSkill={subSkill}
          setSubSkill={(subSkill) => setSetup({
            ...setup,
            subSkill,
          })}
          subSkillMap={subSkillMap}
        />
        <PokemonNatureSelector nature={nature} setNature={(nature) => setSetup({
          ...setup,
          nature,
        })}/>
      </Flex>
      <Flex direction="row">
        <button className="button-clickable-bg ml-auto p-1" onClick={() => onInitiate(setup)}>
          <div className="relative h-9 w-9">
            <CalculatorIcon/>
          </div>
        </button>
      </Flex>
    </Flex>
  );
};

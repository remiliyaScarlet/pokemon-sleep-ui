import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox';
import {pokemonProducingRateStage} from '@/types/game/producing/rate';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {
  TeamMakerBasisValueAtStage,
  TeamMakerInputCalculated,
  TeamMakerIntermediateRate,
} from '@/ui/team/maker/type/common';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


type GetTeamMakerCalcIntermediateOpts = TeamMakerCalcInitOpts & {
  calculatedInput: TeamMakerInputCalculated,
  calculatedSettings: CalculatedUserSettings,
};

export const getTeamMakerCalcIntermediate = ({
  pokeboxList,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  subSkillMap,
  input,
  calculatedSettings,
  calculatedInput,
}: GetTeamMakerCalcIntermediateOpts): TeamMakerIntermediateRate[] => {
  const toTeamMakerFirstPassData = (pokeInBox: PokeInBox): TeamMakerIntermediateRate | null => {
    const pokemon = pokedexMap[pokeInBox.pokemon];

    if (!pokemon || !isPokemonIncludedFromFilter({
      filter: input.pokemon,
      pokemon,
      pokemonLevel: pokeInBox.level,
      ingredientMap,
      ingredientChainMap,
    })) {
      return null;
    }

    const level = input.previewLevel ?? pokeInBox.level;
    const calcOpts: GetPokemonProducingRateOpts = {
      berryData: berryDataMap[pokemon.berry.id],
      skillData: mainSkillMap[pokemon.skill],
      seeds: pokeInBox.seeds ?? defaultSeedUsage,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokeInBox.pokemon,
        pokemonProducingParamsMap,
      }),
      ingredientMap,
      ...pokeInBox,
      ...calculatedSettings,
      ...getProducingRateSingleParams({
        ...pokeInBox,
        level,
        subSkillMap,
      }),
      // Override `level` because preview level might be active
      level,
      // Override `pokemon` in `pokeInBox`
      pokemon,
      // Override `ingredients` in `pokeInBox`
      ingredients: getEffectiveIngredientProductions(pokeInBox),
    };
    const rate = getPokemonProducingRateSingle({
      snorlaxFavorite: input.snorlaxFavorite,
      period: teamMakerProductionPeriod,
      ...calculatedInput,
      ...calcOpts,
    });

    return {
      rate,
      pokeInBox,
      calcOpts,
      basisValueAtStage: Object.fromEntries(pokemonProducingRateStage.map((stage) => [
        stage,
        getTeamMakerBasisValue({
          pokemonRate: rate.atStage[stage],
          targetMeals: calculatedInput.targetMeals,
        }),
      ])) as TeamMakerBasisValueAtStage,
    };
  };

  return pokeboxList
    .flatMap((pokeInBox): PokeInBox[] => {
      if (!input.previewFinalEvolution) {
        return [pokeInBox];
      }

      return getPokemonFinalEvolutionIds({
        pokemonId: pokeInBox.pokemon,
        pokedex: pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map(({id, evolutionCount}): PokeInBox => ({
        ...pokeInBox,
        pokemon: id,
        evolutionCount,
      }));
    })
    .map(toTeamMakerFirstPassData)
    .filter(isNotNullish);
};

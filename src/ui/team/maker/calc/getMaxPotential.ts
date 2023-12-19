import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {getTeamMakerDataSorter} from '@/ui/team/maker/calc/getSorter';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/type/common';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


type GetTeamMakerRateAtMaxPotentialOpts = TeamMakerCalcInitOpts & {
  calculatedInput: TeamMakerInputCalculated,
  calculatedSettings: CalculatedUserSettings,
};

export const getTeamMakerRateAtMaxPotential = ({
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
}: GetTeamMakerRateAtMaxPotentialOpts): TeamMakerRateAtMaxPotentialData[] => {
  const toTeamMakerRateAtMaxPotentialData = (pokeInBox: PokeInBox) => {
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
      useMaxIngredientMultiplier: true,
      period: teamMakerProductionPeriod,
      ...calculatedInput,
      ...calcOpts,
    });

    return {
      rate,
      pokeInBox,
      calcOpts,
      basisValue: getTeamMakerBasisValue({
        pokemonRate: rate.atStage.final,
        targetMeals: calculatedInput.targetMeals,
      }),
    };
  };

  const sorter = getTeamMakerDataSorter<TeamMakerRateAtMaxPotentialData>({
    basis: input.basis,
    getBasisValue: ({basisValue}) => basisValue,
  });

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
    .map(toTeamMakerRateAtMaxPotentialData)
    .filter(isNotNullish)
    .sort(sorter);
};

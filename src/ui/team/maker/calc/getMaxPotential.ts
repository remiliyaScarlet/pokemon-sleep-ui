import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/calc/type';
import {GetTeamMakerCalcPrepOpts} from '@/ui/team/maker/hook/type';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';


type GetTeamMakerRateAtMaxPotentialOpts = GetTeamMakerCalcPrepOpts & {
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
}: GetTeamMakerRateAtMaxPotentialOpts): TeamMakerRateAtMaxPotentialData[] => pokeboxList
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
  .map((pokeInBox) => {
    const pokemon = pokedexMap[pokeInBox.pokemon];

    if (!pokemon || !isPokemonIncludedFromFilter({
      filter: input.pokemon,
      pokemon,
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
      totalStrength: getTotalOfPokemonProducingRate({rate: rate.rate.final, state: 'equivalent'}).energy,
    };
  })
  .filter(isNotNullish)
  .sort((a, b) => (
    b.totalStrength - a.totalStrength
  ));

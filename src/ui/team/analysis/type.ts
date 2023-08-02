import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {BerryDataMap, BerryId} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokedexMap, PokemonId} from '@/types/mongo/pokemon';
import {SnorlaxRankInMap} from '@/types/mongo/snorlax';


export type TeamAnalysisFilter = PokemonInputFilter<PokemonInputType> & {
  snorlaxFavorite: FilterInclusionMap<BerryId>,
};

export type TeamAnalysisDataProps = {
  pokedex: PokedexMap,
  berryMap: BerryDataMap,
  ingredientMap: IngredientMap,
  snorlaxRankData: SnorlaxRankInMap[],
};

export const teamAnalysisSlotName = ['A', 'B', 'C', 'D', 'E'] as const;

export type TeamAnalysisSlotName = typeof teamAnalysisSlotName[number];

export type TeamAnalysisMember = {
  pokemonId: PokemonId,
  level: number,
};

export type TeamAnalysisBonus = {
  overall: number,
  ingredient: number,
};

export type TeamAnalysisTeamSetup = {
  team: {[slot in TeamAnalysisSlotName]: TeamAnalysisMember | null},
  bonus: TeamAnalysisBonus,
};

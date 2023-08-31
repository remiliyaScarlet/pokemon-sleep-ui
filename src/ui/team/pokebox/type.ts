import {Session} from 'next-auth';

import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {RatingBonus} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subskill';


export type PokeboxDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  ingredientMap: IngredientMap,
  pokemonMaxLevel: number,
  preloadedRatingBonus: RatingBonus | undefined,
};

export type PokeboxCommonProps = PokeboxDataProps & {
  session: Session | null,
  berryDataMap: BerryDataMap,
  mapMeta: FieldMetaMap,
};

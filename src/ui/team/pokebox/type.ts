import {Session} from 'next-auth';

import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {SubSkillMap} from '@/types/game/pokemon/subskill';


export type PokeboxCommonProps = {
  session: Session | null,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
  mapMeta: FieldMetaMap,
};

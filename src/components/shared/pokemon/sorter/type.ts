import {SubSkillBonus} from '@/types/game/pokemon/subskill';
import {NatureId} from '@/types/game/producing/nature';
import {BerryData} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {GetProducingRateChangeableOpts} from '@/utils/game/producing/type';


export const pokemonSortType = [
  'id',
  'ingredientEnergy',
  'ingredientCount',
  'berryEnergy',
  'berryCount',
  'friendshipPoint',
  'frequency',
  'totalEnergy',
] as const;

export type PokemonSortType = typeof pokemonSortType[number];

export type PokemonInfoWithSortingPayload<TExtra> = {
  pokemon: PokemonInfo,
  level: number,
  extra: TExtra,
};

export type SortedPokemonInfo<TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>> = {
  sorter: ReturnType<PokemonSorterGetter>,
  source: TSource,
};

export type PokemonSorterGetterOpts = GetProducingRateChangeableOpts & {
  pokemon: PokemonInfo,
  level: number,
  ingredientMap: IngredientMap,
  berryData: BerryData | null,
  subSkillBonus: SubSkillBonus | null,
  natureId: NatureId | null,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;

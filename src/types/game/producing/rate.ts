import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {SubSkillBonus} from '@/types/game/pokemon/subskill';
import {Indexable} from '@/utils/type';


export type ProducingRate = {
  quantity: number,
  dailyEnergy: number,
};

export type ProducingRateProportion = {
  count: number,
  picks: number,
};

export type ProducingRateOfItem<TId extends Indexable = number> = ProducingRate & {
  id: TId,
};

export type ProducingRateSingleParams = {
  helperCount: number | null,
  subSkillBonus: SubSkillBonus | null,
  natureId: NatureId | null,
};

export type ProducingRateCommonParams = ProducingRateSingleParams & {
  level: number
  pokemon: PokemonInfo,
};

export type PokemonProducingRate = {
  berry: ProducingRateOfItem,
  ingredient: {[ingredientId in IngredientId]: ProducingRateOfItem},
};

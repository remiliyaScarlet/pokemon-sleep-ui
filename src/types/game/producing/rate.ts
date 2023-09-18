import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
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
  frequency: number,
};

export type ProducingRateSingleParams = {
  helperCount: number | null,
  subSkillBonus: GroupedSubSkillBonus | null,
  natureId: NatureId | null,
};

export type ProducingRateCommonParams = ProducingRateSingleParams & {
  level: number
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  bonus: EffectiveBonus,
};

export type PokemonProducingRate = {
  berry: ProducingRateOfItem,
  ingredient: {[ingredientId in IngredientId]: ProducingRateOfItem},
};

import {NatureId} from '@/types/game/pokemon/nature';
import {SubSkillBonus} from '@/types/game/pokemon/subskill';
import {PokemonInfo} from '@/types/mongo/pokemon';


export type ProducingRate = {
  quantity: number,
  dailyEnergy: number,
};

export type ProducingRateProportion = {
  count: number,
  picks: number,
};

export type ProducingRateOfItem = ProducingRate & {
  id: number
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
  ingredient: ProducingRateOfItem | null,
};

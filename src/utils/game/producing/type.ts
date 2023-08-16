import {SubSkillBonus} from '@/types/game/pokemon/subskill';
import {NatureId} from '@/types/game/producing/nature';
import {PokemonInfo} from '@/types/mongo/pokemon';


export type GetProducingRateChangeOnTeamOpts = {
  helperCount: number | null,
};

export type GetProducingRateChangeOnIndividualOpts = {
  subSkillBonus: SubSkillBonus | null,
  natureId: NatureId | null,
};

export type GetProducingRateChangeableOpts =
  GetProducingRateChangeOnTeamOpts & GetProducingRateChangeOnIndividualOpts;

export type GetProducingRateCommonOpts = GetProducingRateChangeableOpts & {
  level: number
  pokemon: PokemonInfo,
};

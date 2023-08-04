import {SubSkillBonus} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/producing/nature';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {Nullable} from '@/utils/type';


export type GetProducingRateChangeOnTeamOpts = {
  helperCount: number | null,
};

export type GetProducingRateChangeOnIndividualOpts = {
  subSkillBonus: SubSkillBonus | null,
  natureId: NatureId | null,
};

export type GetProducingRateChangeableOpts =
  GetProducingRateChangeOnTeamOpts & GetProducingRateChangeOnIndividualOpts;

export type GetProducingRateCommonOpts = Nullable<GetProducingRateChangeableOpts> & {
  level: number
  pokemon: PokemonInfo,
};

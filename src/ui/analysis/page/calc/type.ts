import {SnorlaxRank} from '@/types/game/rank';
import {BerryId} from '@/types/mongo/berry';
import {IngredientId} from '@/types/mongo/ingredient';
import {
  PokemonId,
  PokemonSkillId,
  PokemonSleepTypeId,
  PokemonSpecialtyId,
  PokemonTypeId,
} from '@/types/mongo/pokemon';
import {SleepMapId} from '@/types/mongo/sleepStyle';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


export type AnalysisStatsLinkedData<TData> = {
  pokemonId: PokemonId,
  data: TData,
};

export type AnalysisStatsCommon<TData> = {
  linked: AnalysisStatsLinkedData<TData>[],
  totalCount: number,
};

export type AnalysisStatsGrouped<TData> = AnalysisStatsCommon<TData> & {
  sharedCount: number,
};

export type AnalysisStatsContinuous<TData> = AnalysisStatsCommon<TData> & {
  percentile: number | null,
  percentage: number | null,
  rank: number | null,
  current: number,
};

export type AnalysisStatsProducingRate = {
  count: AnalysisStatsContinuous<number>,
  energy: AnalysisStatsContinuous<number>,
};

export type AnalysisStatsSleepStyleAppearance = AnalysisStatsContinuous<SnorlaxRank> & {
  snorlaxRank: SnorlaxRank,
};

export type AnalysisStatsSleepStyle = {
  mapId: SleepMapId,
  first: AnalysisStatsSleepStyleAppearance,
  last: AnalysisStatsSleepStyleAppearance,
};

export type AnalysisStats = {
  pokemon: {
    type: AnalysisStatsGrouped<PokemonTypeId>,
    specialty: AnalysisStatsGrouped<PokemonSpecialtyId | null>,
    sleepType: AnalysisStatsGrouped<PokemonSleepTypeId>,
    ingredient: {
      fixed: AnalysisStatsGrouped<IngredientId | undefined>,
      random: AnalysisStatsGrouped<IngredientId>[],
    },
    berry: AnalysisStatsGrouped<BerryId>,
    mainSkill: AnalysisStatsGrouped<PokemonSkillId>,
    sleepStyle: AnalysisStatsSleepStyle[],
  },
  producingRate: {
    berry: AnalysisStatsProducingRate,
    ingredient: AnalysisStatsProducingRate | null,
  },
};

export type GetAnalysisStatsCommonOpts<TSample> = {
  samples: TSample[],
  getPokemonId: (sample: TSample) => PokemonId,
};

export type GetAnalysisStatsOpts = AnalysisPageCommonProps & {
  level: number,
};

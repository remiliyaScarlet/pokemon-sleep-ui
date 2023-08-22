import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {
  PokemonId,
  PokemonSkillId,
  PokemonSleepTypeId,
  PokemonSpecialtyId,
  PokemonTypeId,
} from '@/types/game/pokemon';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';
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
    total: AnalysisStatsContinuous<number>,
  },
};

export type GetAnalysisStatsCommonOpts<TSample> = {
  samples: TSample[],
  getPokemonId: (sample: TSample) => PokemonId,
};

export type GetAnalysisStatsOpts = Omit<AnalysisPageCommonProps, 'mapMeta'> & {
  level: number,
  snorlaxFavorite: SnorlaxFavorite,
};

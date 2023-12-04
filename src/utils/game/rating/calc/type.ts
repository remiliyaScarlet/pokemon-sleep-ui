import {NatureId} from '@/types/game/pokemon/nature';
import {SubSkillData} from '@/types/game/pokemon/subSkill';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';


export type CalculateRatingDataWorkerOpts = Omit<
  GetRatingValueOfSimulationOpts,
  'subSkill' | 'nature'
> & {
  subSkillData: SubSkillData[],
  natureIds: NatureId[],
};

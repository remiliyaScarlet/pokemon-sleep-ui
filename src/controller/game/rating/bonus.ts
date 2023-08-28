import {Session} from 'next-auth';

import {userDataTeamAnalysisSetup} from '@/controller/user/manager';
import {RatingBonus} from '@/types/game/pokemon/rating';


export const loadRatingBonusFromSession = async (session: Session | null): Promise<RatingBonus | undefined> => {
  const teamAnalysisSetup = session?.user.id ?
    await userDataTeamAnalysisSetup.getData(session.user.id) :
    undefined;

  return teamAnalysisSetup?.data.bonus;
};

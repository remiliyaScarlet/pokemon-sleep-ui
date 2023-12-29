import {maxTeamMemberCount} from '@/const/game/production';
import {getHelpingBonusSimpleMultiplier} from '@/utils/game/producing/multiplier';


export const helpingBonusSimpleMultiplier = getHelpingBonusSimpleMultiplier(maxTeamMemberCount);

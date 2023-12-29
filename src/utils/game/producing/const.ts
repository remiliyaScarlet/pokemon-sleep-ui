import {maxTeamMemberCount} from '@/const/game/production';
import {getHelperBonusSimpleMultiplier} from '@/utils/game/producing/multiplier';


export const helperBonusSimpleMultiplier = getHelperBonusSimpleMultiplier(maxTeamMemberCount);

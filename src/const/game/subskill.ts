import {FriendshipLevelOfGoldLock} from '@/types/game/pokemon/subSkill';


export const friendshipLevelToGoldLock: {[level in FriendshipLevelOfGoldLock]: number} = {
  0: 0,
  10: 1,
  45: 2,
  100: 3,
};

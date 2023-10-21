import {EffectiveBonus} from '@/types/game/bonus';


export const testBonus: {[id in number]: EffectiveBonus} = {
  1: {
    ingredient: 20,
    map: 5,
    stamina: {
      sleep: 2.2,
      awake: 1.6,
    },
    overall: 20,
  },
};

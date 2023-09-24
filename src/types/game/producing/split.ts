import {ProduceType} from '@/types/game/producing/common';


export type ProducingSleepStateSplit = {
  awake: number,
  sleepVacant: number,
  sleepFilled: number,
};

export type ProduceSplit = {[type in ProduceType]: number};

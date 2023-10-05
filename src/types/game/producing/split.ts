import {ProduceType} from '@/types/game/producing/common';
import {ProducingStateWithPack} from '@/types/game/producing/state';


export type ProducingSleepStateSplit = {[state in ProducingStateWithPack]: number};

export type ProduceSplit = {[type in ProduceType]: number};

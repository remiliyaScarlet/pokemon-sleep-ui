export type ProducingState = 'awake' | 'sleep';

export type ProducingStateWithPack = 'awake' | 'sleepVacant' | 'sleepFilled';

export type ProducingStateOfRate = ProducingStateWithPack | 'equivalent';

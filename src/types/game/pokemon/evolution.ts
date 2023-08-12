import {PokemonId, PokemonTypeId} from '@/types/mongo/pokemon';


export type PokemonEvolutionCondition = {
  type: 'level',
  level: number,
} | {
  type: 'candy',
  count: number,
} | {
  type: 'stone',
  element: PokemonTypeId,
} | {
  type: 'sleepTime',
  hours: number,
} | {
  type: 'timing',
  startHour: number,
  endHour: number,
};

export type PokemonEvolutionBranch = {
  id: PokemonId,
  conditions: PokemonEvolutionCondition[],
};

export type PokemonEvolutionStage = {
  current: PokemonId,
  next: PokemonEvolutionBranch[],
} & ({
  stage: 1,
  previous: null,
} | {
  stage: 2 | 3 | 4 | 5,
  previous: PokemonId,
});

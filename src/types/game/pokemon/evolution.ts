import {ItemId} from '@/types/game/item';
import {PokemonId} from '@/types/mongo/pokemon';


export type EvolutionCondition = {
  type: 'level',
  level: number,
} | {
  type: 'candy',
  count: number,
} | {
  type: 'item',
  item: ItemId,
} | {
  type: 'sleepTime',
  hours: number,
} | {
  type: 'timing',
  startHour: number,
  endHour: number,
};

export type EvolutionBranch = {
  id: PokemonId,
  conditions: EvolutionCondition[],
};

export type EvolutionData = {
  pokemon: PokemonId,
  next: EvolutionBranch[],
} & ({
  stage: 1,
  previous: null,
} | {
  stage: 2 | 3,
  previous: PokemonId,
});

export type EvolutionStage = EvolutionData['stage'];

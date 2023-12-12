import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox';
import {TeamAnalysisMember} from '@/types/teamAnalysis';


export const toTeamAnalysisMember = ({
  name,
  level,
  pokemon,
  nature,
  subSkill,
  ingredients,
  evolutionCount,
  seeds,
}: PokeInBox): TeamAnalysisMember => {
  return {
    name,
    level,
    pokemonId: pokemon,
    nature,
    subSkill,
    ingredients,
    evolutionCount,
    seeds: seeds ?? defaultSeedUsage,
  };
};

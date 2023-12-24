import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {Nullable} from '@/utils/type';


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
    seeds,
  };
};

export const toTeamAnalysisMemberNullable = (pokeInBox: Nullable<PokeInBox>): TeamAnalysisMember | null => {
  if (!pokeInBox) {
    return null;
  }

  return toTeamAnalysisMember(pokeInBox);
};

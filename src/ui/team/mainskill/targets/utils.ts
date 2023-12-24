import {PokeInBox} from '@/types/userData/pokebox/main';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


export const toSkillTriggerAnalysisUnitFromPokeInBox = (pokeInBox: PokeInBox): SkillTriggerAnalysisUnit => {
  const {pokemon} = pokeInBox;

  return {
    ...pokeInBox,
    pokemonId: pokemon,
    show: true,
  };
};

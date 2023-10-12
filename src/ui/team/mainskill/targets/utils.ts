import {PokeInBox} from '@/types/game/pokebox';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


export const toSkillTriggerAnalysisUnitFromPokeInBox = (pokeInBox: PokeInBox): SkillTriggerAnalysisUnit => {
  const {pokemon} = pokeInBox;

  return {
    ...pokeInBox,
    pokemonId: pokemon,
    show: true,
  };
};

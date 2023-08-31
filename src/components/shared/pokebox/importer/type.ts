import {PokeInBox} from '@/types/game/pokebox';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


export type PokeboxImporterCommonProps = {
  subSkillMap: SubSkillMap,
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
};

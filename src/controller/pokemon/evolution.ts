import {getPokemonRequiringItemToEvolve} from '@/controller/pokemon/info';
import {EvolutionItemMap} from '@/types/game/pokemon/item';


export const getEvolutionItemMap = async (): Promise<EvolutionItemMap> => {
  const ret: EvolutionItemMap = {};

  for await (const pokemon of await getPokemonRequiringItemToEvolve()) {
    for (const {conditions} of pokemon.evolution.next) {
      for (const condition of conditions) {
        if (condition.type !== 'item') {
          continue;
        }

        const {item} = condition;
        if (!(item in ret)) {
          ret[item] = [];
        }

        ret[item].push(pokemon);
      }
    }
  }

  return ret;
};

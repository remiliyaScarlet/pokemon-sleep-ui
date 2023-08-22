import {PokemonId, PokemonInfo} from '@/types/game/pokemon';


export const getRelatedPokemonIds = ({evolution}: PokemonInfo): PokemonId[] => {
  const relatedId: PokemonId[] = evolution.next.map(({id}) => id);

  if (evolution.previous) {
    relatedId.push(evolution.previous);
  }

  return relatedId;
};

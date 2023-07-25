import {getTranslator} from 'next-intl/server';

import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {Pokemon} from '@/ui/pokedex/page/main';
import {generatePageMeta} from '@/utils/meta';


type PokedexPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<PokedexPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getTranslator(locale, 'Game.PokemonName');

  return generatePageMeta({key: 'Pokedex.Page.Title', values: {name: t(id)}})({params});
};

export default Pokemon;

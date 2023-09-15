import {getAllPokemonAsArray} from '@/controller/pokemon/info';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {Pokemon} from '@/ui/pokedex/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export const generateStaticParams = async () => {
  return (await getAllPokemonAsArray()).map(({id}) => id);
};

export type PokedexPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<PokedexPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.PokemonName'});

  return generatePageMeta({key: 'Pokedex.Page.Title', values: {name: t(id)}})({params});
};

export default Pokemon;

import {getAllPokemonAsArray} from '@/controller/pokemon';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {EvolutionItemPage} from '@/ui/item/evolution/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export const generateStaticParams = async () => {
  return (await getAllPokemonAsArray()).map(({id}) => id);
};

export type EvolutionItemPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<EvolutionItemPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Item'});

  return generatePageMeta({key: 'Item.Evolution.Page.Title', values: {name: t(id)}})({params});
};

export default EvolutionItemPage;

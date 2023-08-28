import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {IngredientPage} from '@/ui/ingredient/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export type IngredientPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<IngredientPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Food'});

  return generatePageMeta({key: 'Ingredient.Page.Title', values: {name: t(id)}})({params});
};

export default IngredientPage;

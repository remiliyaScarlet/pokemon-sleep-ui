import {DocsDataEditable} from '@/types/mongo/docs';
import {Locale} from '@/types/next/locale';


export type DocRenderingCommonProps = {
  locale: Locale,
  doc: DocsDataEditable,
};

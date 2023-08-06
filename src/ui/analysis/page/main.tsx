import React from 'react';

import {AnalysisPageParams} from '@/app/[locale]/analysis/[id]/page';
import {Failed} from '@/components/icons/failed';
import {I18nProvider} from '@/contexts/i18n';
import {getBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokemonAsMap} from '@/controller/pokemon';
import {AnalysisPageClient} from '@/ui/analysis/page/client';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {PageLayout} from '@/ui/base/layout';



export const AnalysisPage = () => {
  return (
    <PageLayout>
      Analysis Page
    </PageLayout>
  );
};

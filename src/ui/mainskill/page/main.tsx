import React from 'react';

import {MainSkillPageParams} from '@/app/[locale]/mainskill/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {I18nProvider} from '@/contexts/i18n';
import {getMainSkillData} from '@/controller/mainSkill';
import {getPokemonByMainSkill} from '@/controller/pokemon';
import {PageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MainSkillMeta} from '@/ui/mainskill/page/meta';
import {MainSkillAvailablePokemon} from '@/ui/mainskill/page/pokemon';
import {MainSkillValueTable} from '@/ui/mainskill/page/table';


export const MainSkillPage = async ({params}: PageProps<MainSkillPageParams>) => {
  const {locale, id} = params;
  const idNumber = Number(id);
  const [
    mainSkillData,
    pokemonOfMainSkill,
  ] = await Promise.all([
    getMainSkillData(idNumber),
    getPokemonByMainSkill(idNumber),
  ]);

  if (!mainSkillData) {
    return <Failed text="Data"/>;
  }

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <MainSkillMeta data={mainSkillData}/>
      <MainSkillValueTable data={mainSkillData}/>
      <I18nProvider locale={locale} namespaces={['Game']}>
        <MainSkillAvailablePokemon pokemonList={pokemonOfMainSkill}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};

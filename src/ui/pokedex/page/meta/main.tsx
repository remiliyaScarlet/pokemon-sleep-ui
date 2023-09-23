'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/ingredientRate';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {specialtyTextClassDefault} from '@/styles/game/specialty';
import {PokemonImageGallery} from '@/ui/pokedex/page/gallery';
import {PokemonMetaSection} from '@/ui/pokedex/page/meta/section';
import {PokemonStats} from '@/ui/pokedex/page/meta/stats';
import {metaTitleClass} from '@/ui/pokedex/page/style';
import {PokemonProps} from '@/ui/pokedex/page/type';


export const PokemonMeta = (props: PokemonProps) => {
  const {pokemon, pokemonProducingParams} = props;
  const {specialty, sleepType, skill} = pokemon;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="col" center className="info-section gap-2 lg:flex-row">
      <Flex direction="col" className="gap-2 md:p-5 lg:p-8">
        <PokemonNameBig pokemon={pokemon}/>
        <PokemonImageGallery {...props}/>
      </Flex>
      <AdsUnit className="my-2 lg:hidden"/>
      <Flex direction="col" className="gap-y-3 md:p-5 lg:p-8">
        <PokemonMetaSection title={t2('Info.SleepType')} contentClassName="text-lg">
          <PokemonSleepType sleepType={sleepType} dimension="h-7 w-7"/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Specialty')}
          contentClassName={clsx('text-lg', specialty && specialtyTextClassDefault[specialty])}
        >
          <PokemonSpecialty specialty={specialty} dimension="h-7 w-7"/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.MainSkill')}
          titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.skill && 'bg-blink')}
        >
          <Flex direction="col">
            <Flex direction="col" center className="h-12 text-lg">
              <Link href={`/info/mainskill/${skill}`} className="button-clickable-bg p-1 px-2">
                {t(`MainSkill.Name.${skill}`)}
              </Link>
            </Flex>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t(`MainSkill.Description.${skill}`)}
            </div>
          </Flex>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Sort.IngredientRate')}
          contentClassName="flex justify-center"
        >
          <PokemonIngredientRate split={pokemonProducingParams.ingredientSplit} noIcon/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Stats')}
          contentClassName="flex justify-center"
        >
          <PokemonStats {...props}/>
        </PokemonMetaSection>
      </Flex>
    </Flex>
  );
};

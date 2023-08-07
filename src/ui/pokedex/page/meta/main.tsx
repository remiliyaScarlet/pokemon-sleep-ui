'use client';
import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonName} from '@/components/shared/pokemon/name';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {specialtyIdMap} from '@/const/game/pokemon';
import {sleepTypeBgClass, sleepTypeTextClass, specialtyTextClass} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {PokemonImageGallery} from '@/ui/pokedex/page/gallery';
import {PokemonBerryMeta} from '@/ui/pokedex/page/meta/berry';
import {PokemonIngredientMeta} from '@/ui/pokedex/page/meta/ingredient';
import {PokemonMetaSection} from '@/ui/pokedex/page/meta/section';
import {PokemonStats} from '@/ui/pokedex/page/meta/stats';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {classNames} from '@/utils/react';


export const PokemonMeta = (props: PokemonProps) => {
  const {pokemon, berryData, ingredientMap} = props;
  const {specialty, sleepType, berry, skill} = pokemon;

  const [level, setLevel] = React.useState(1);

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');
  const t3 = useTranslations('UI.Metadata');

  const metaTitleClass = 'whitespace-nowrap text-sm text-slate-500';

  const berryName = t(`Berry.${berry.id}`);
  const pokemonName = t(`PokemonName.${pokemon.id}`);

  return (
    <Flex direction="col" center className="info-section gap-2 md:flex-row">
      <Flex direction="col" className="gap-2 md:p-5 lg:p-8">
        <PokemonName pokemon={pokemon}/>
        <PokemonLevelSlider level={level} setLevel={setLevel} maxLevel={berryData.energy.length} noSameLine/>
        <PokemonImageGallery {...props}/>
      </Flex>
      <AdsUnit className="my-2 md:hidden"/>
      <Flex direction="col" className="gap-y-3 md:p-5 lg:p-8">
        <PokemonMetaSection title={t2('Info.SleepType')} contentClassName="text-lg">
          <Flex direction="row" className="gap-1" center>
            <div className={classNames('h-5 w-5 rounded-full', sleepTypeBgClass[sleepType])}/>
            <div className={sleepTypeTextClass[sleepType]}>
              {t(`SleepType.${sleepType}`)}
            </div>
          </Flex>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Specialty')}
          contentClassName={classNames('text-lg', specialty ? specialtyTextClass[specialty] : undefined)}
        >
          <PokemonSpecialty specialty={specialty} dimension="h-5 w-5"/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Berry')}
          titleClassName={classNames(metaTitleClass, specialty === specialtyIdMap.berry ? 'bg-blink' : '')}
        >
          <PokemonBerryMeta pokemon={pokemon} level={level} berryData={berryData} berryName={berryName}/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Ingredient')}
          titleClassName={classNames(metaTitleClass, specialty === specialtyIdMap.ingredient ? 'bg-blink' : '')}
        >
          <PokemonIngredientMeta pokemon={pokemon} level={level} ingredientMap={ingredientMap}/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.MainSkill')}
          titleClassName={classNames(metaTitleClass, specialty === specialtyIdMap.skill ? 'bg-blink' : '')}
        >
          <Flex direction="col">
            <div className="text-lg">
              {t(`MainSkill.Name.${skill}`)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t(`MainSkill.Description.${skill}`)}
            </div>
          </Flex>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Stats')}
          contentClassName="flex justify-center"
        >
          <PokemonStats {...props}/>
        </PokemonMetaSection>
        <Flex direction="col" className="items-end">
          <Link href={`/analysis/${pokemon.id}`} className="button-clickable group relative mt-auto h-10 w-10">
            <NextImage
              src="/images/generic/analysis.png" alt={t3('Analysis.Title', {name: pokemonName})}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

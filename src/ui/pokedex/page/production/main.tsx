import React from 'react';

import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonIndividualSelectorButtonProps} from '@/components/shared/pokemon/selector/type';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultLevel} from '@/const/game/production';
import {useUserActivation} from '@/hooks/userData/activation';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {imageIconSizes} from '@/styles/image';
import {PokemonMetaSection} from '@/ui/pokedex/page/meta/section';
import {PokemonBerryProduction} from '@/ui/pokedex/page/production/berry';
import {PokemonProductionCombination} from '@/ui/pokedex/page/production/combination';
import {PokemonIngredientPossibilities} from '@/ui/pokedex/page/production/ingredient/possibility';
import {PokemonProductionInput} from '@/ui/pokedex/page/production/type';
import {metaTitleClass} from '@/ui/pokedex/page/style';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonProduction = (props: PokemonDataProps) => {
  const {
    pokemon,
    berryData,
    ingredientChainMap,
    mealMap,
    subSkillMap,
    preloaded,
  } = props;
  const {specialty, berry, ingredientChain} = pokemon;

  const [input, setInput] = React.useState<PokemonProductionInput>({
    level: defaultLevel,
    subSkill: {},
    nature: null,
  });
  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
  });

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');
  const t3 = useTranslations('UI.Metadata');

  const chain = ingredientChainMap[ingredientChain];
  const analysisTitle = t3('Analysis.Title', {name: t(`PokemonName.${pokemon.id}`)});

  const selectorProps: PokemonIndividualSelectorButtonProps = {
    classNameForHeight: 'h-8',
    isPremium,
    requirePremium: true,
  };

  return (
    <Flex center className="info-section">
      <PokemonLevelSlider
        value={input.level}
        setValue={(level) => setInput((original): PokemonProductionInput => ({
          ...original,
          level,
        }))}
        max={berryData.energy.length}
        noSameLine
      />
      <Flex className="gap-1.5 sm:flex-row">
        <PokemonSubSkillSelector
          subSkill={input.subSkill}
          setSubSkill={(subSkill) => setInput((original): PokemonProductionInput => ({
            ...original,
            subSkill,
          }))}
          subSkillMap={subSkillMap}
          {...selectorProps}
        />
        <PokemonNatureSelector
          nature={input.nature}
          setNature={(nature) => setInput((original): PokemonProductionInput => ({
            ...original,
            nature,
          }))}
          {...selectorProps}
        />
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <PokemonMetaSection
        title={t2('Info.Berry')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.berry && 'bg-blink')}
      >
        <PokemonBerryProduction
          pokemon={pokemon}
          berryName={t(`Berry.${berry.id}`)}
        />
      </PokemonMetaSection>
      <PokemonMetaSection
        title={t2('Info.Ingredient')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.ingredient && 'bg-blink')}
      >
        <PokemonIngredientPossibilities chain={chain}/>
      </PokemonMetaSection>
      <PokemonMetaSection title={t2('Info.Production')} titleClassName={metaTitleClass}>
        <PokemonProductionCombination
          input={input}
          chain={chain}
          translatedSettings={translatedSettings}
          {...props}
        />
      </PokemonMetaSection>
      <PokemonMetaSection title={<LinkIcon className="h-6 w-6"/>} titleClassName={metaTitleClass}>
        <FlexLink href={`/analysis/${pokemon.id}`} className={clsx(
          'button-clickable-bg group items-center gap-1.5 self-end px-2 py-1',
        )}>
          <div>
            {analysisTitle}
          </div>
          <div className="relative h-10 w-10">
            <NextImage
              src="/images/generic/analysis.png"
              alt={analysisTitle}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </div>
        </FlexLink>
      </PokemonMetaSection>
    </Flex>
  );
};

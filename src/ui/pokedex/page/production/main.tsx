'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultNeutralOpts} from '@/const/game/production';
import {useEffectiveBonus} from '@/hooks/userData/settings';
import {imageIconSizes} from '@/styles/image';
import {PokemonMetaSection} from '@/ui/pokedex/page/meta/section';
import {PokemonBerryProduction} from '@/ui/pokedex/page/production/berry';
import {PokemonIngredientProduction} from '@/ui/pokedex/page/production/ingredient/main';
import {metaTitleClass} from '@/ui/pokedex/page/style';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';


export const PokemonProduction = (props: PokemonProps) => {
  const {
    pokemon,
    pokemonProducingParams,
    berryData,
    preloadedSettings,
  } = props;
  const {specialty, berry} = pokemon;

  const [level, setLevel] = React.useState(1);
  const {data} = useSession();
  const bonus = useEffectiveBonus({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');
  const t3 = useTranslations('UI.Metadata');

  const berryName = t(`Berry.${berry.id}`);
  const pokemonName = t(`PokemonName.${pokemon.id}`);

  const berryRate = getBerryProducingRate({
    level,
    pokemon,
    pokemonProducingParams,
    ...defaultNeutralOpts,
    berryData,
    bonus,
    snorlaxFavorite: {},
  });

  return (
    <Flex direction="col" center className="info-section gap-2">
      <PokemonLevelSlider level={level} setLevel={setLevel} maxLevel={berryData.energy.length} noSameLine/>
      <PokemonMetaSection
        title={t2('Info.Berry')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.berry && 'bg-blink')}
      >
        <PokemonBerryProduction
          pokemon={pokemon}
          berryName={berryName}
          rate={berryRate}
        />
      </PokemonMetaSection>
      <PokemonMetaSection
        title={t2('Info.Ingredient')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.ingredient && 'bg-blink')}
      >
        <PokemonIngredientProduction level={level} bonus={bonus} berryRate={berryRate} {...props}/>
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
  );
};

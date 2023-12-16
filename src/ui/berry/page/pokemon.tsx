import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonBerryStats} from '@/components/shared/pokemon/icon/itemStats/berry';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {PokemonIndividualParamsInput} from '@/components/shared/pokemon/predefined/individual/type';
import {defaultLevel} from '@/const/game/production';
import {useUserActivation} from '@/hooks/userData/activation';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {BerryPageDataProps} from '@/ui/berry/page/type';


export const BerryProducingRatesOfPokemon = ({
  mealMap,
  preloaded,
  ...props
}: BerryPageDataProps) => {
  const {berryData, subSkillMap} = props;

  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
  });
  const [input, setInput] = React.useState<PokemonIndividualParamsInput>({
    level: defaultLevel,
    subSkill: {},
    nature: null,
  });

  return (
    <>
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        maxLevel={berryData.energy.length}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
        className="info-section"
      />
      <PokemonBerryStats
        input={input}
        translatedSettings={translatedSettings}
        {...props}
      />
    </>
  );
};

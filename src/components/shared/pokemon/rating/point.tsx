import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {RatingDataPoint} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {formatFloat} from '@/utils/number';


type Props = {
  point: RatingDataPoint | null,
  subSkillMap: SubSkillMap,
  icon: React.ReactNode,
  className: string,
};

export const RatingDataPointUI = ({point, subSkillMap, icon, className}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  if (!point) {
    return <></>;
  }

  const {value, combination} = point;

  return (
    <Flex direction="row" center className={clsx('gap-1 rounded-lg p-3', className)}>
      <div className="relative h-7 w-7">
        {icon}
      </div>
      <Flex direction="col" center className="ml-auto">
        <Flex direction="row" noFullWidth className="text-energy items-center gap-0.5 p-2 text-3xl">
          <ColoredEnergyIcon alt={t('Stats.Energy.Name')} dimension="h-7 w-7"/>
          <div>
            {formatFloat(value)}
          </div>
        </Flex>
        <div className="h-8">
          <PokemonIngredientIcons ingredients={[combination.productions]}/>
        </div>
        <div className="h-8">
          <PokemonNatureIndicator nature={combination.natureId}/>
        </div>
        <div className="h-8">
          <PokemonSubSkillIndicator subSkill={combination.subSkill} subSkillMap={subSkillMap}/>
        </div>
      </Flex>
    </Flex>
  );
};

import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {RatingBasisIcon} from '@/components/shared/pokemon/rating/basisIcon';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {RatingBasis, RatingDataPoint} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {formatFloat} from '@/utils/number';


type Props = {
  level: PokemonKeyLevel,
  point: RatingDataPoint | null,
  subSkillMap: SubSkillMap,
  icon: React.ReactNode,
  basis: RatingBasis | undefined,
  className: string,
};

export const RatingDataPointUI = ({level, point, subSkillMap, icon, basis, className}: Props) => {
  if (!point) {
    return <></>;
  }

  const {value, combination} = point;

  return (
    <Flex direction="row" center className={clsx('gap-1 rounded-lg p-3', className)}>
      <div className="relative h-7 w-7">
        {icon}
      </div>
      <Flex center className="ml-auto">
        <Flex direction="row" noFullWidth className={clsx(
          'items-center gap-0.5 p-2 text-3xl',
          basis === 'totalProduction' && 'text-energy',
        )}>
          {basis && <RatingBasisIcon basis={basis}/>}
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
          <PokemonSubSkillIndicator subSkill={combination.subSkill} subSkillMap={subSkillMap} level={level}/>
        </div>
      </Flex>
    </Flex>
  );
};

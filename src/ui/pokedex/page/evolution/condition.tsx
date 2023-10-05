import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {EvolutionCondition} from '@/types/game/pokemon/evolution';


type Props = {
  condition: EvolutionCondition,
};

export const PokemonEvolutionCondition = ({condition}: Props) => {
  const type = condition.type;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.Evolution');

  if (type === 'level') {
    return (
      <Flex direction="row" className="gap-1">
        <GenericIconLarger src="/images/generic/lv.png" alt="Lv"/>
        <div>{condition.level}</div>
      </Flex>
    );
  }

  if (type === 'candy') {
    return (
      <Flex direction="row" className="gap-1">
        <GenericIconLarger src="/images/generic/candy.png" alt={t('Candy')} noInvert/>
        <div>{condition.count}</div>
      </Flex>
    );
  }

  if (type === 'item') {
    const itemName = t2(`Item.${condition.item}`);

    return (
      <Flex direction="row" className="gap-1">
        <GenericIconLarger src={`/images/item/${condition.item}.png`} alt={itemName} noInvert/>
        <div>{itemName}</div>
      </Flex>
    );
  }

  if (type === 'sleepTime') {
    return (
      <Flex direction="row" className="gap-1">
        <GenericIconLarger src="/images/generic/sleep.png" alt={t3('SleepTime')} noInvert/>
        <div>{condition.hours}&nbsp;{t('Hour')}</div>
      </Flex>
    );
  }

  if (type === 'timing') {
    return (
      <Flex direction="row" className="gap-1">
        <div className="h-6 w-6">
          <ClockIcon/>
        </div>
        <div>{condition.startHour}&nbsp;~&nbsp;{condition.endHour}</div>
      </Flex>
    );
  }

  console.error(`Unhandled evolution condition type of [${type satisfies never}]`);
};

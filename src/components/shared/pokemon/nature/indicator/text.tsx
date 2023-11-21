import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NatureEffectIcon} from '@/components/shared/pokemon/nature/effectIcon';
import {PokemonNatureIndicatorCommonProps} from '@/components/shared/pokemon/nature/indicator/type';
import {natureDataMap} from '@/data/nature';


export const PokemonNatureIndicatorText = ({nature, hideName}: PokemonNatureIndicatorCommonProps) => {
  const t = useTranslations('Game');

  if (!nature) {
    return <XCircleIcon className="h-5 w-5"/>;
  }

  const dataOfNature = natureDataMap[nature];
  if (!dataOfNature) {
    return <QuestionMarkCircleIcon className="h-5 w-5"/>;
  }

  const buffEffectId = dataOfNature.buff;
  const nerfEffectId = dataOfNature.nerf;

  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      {
        !hideName &&
        <div className="whitespace-nowrap">
          {t(`Nature.${nature}`)}
        </div>
      }
      <Flex direction="row" center noFullWidth>
        <ChevronUpIcon className="h-4 w-4"/>
        <div className="relative h-6 w-6">
          <NatureEffectIcon effectId={buffEffectId} showOnNull/>
        </div>
        <ChevronDownIcon className="h-4 w-4"/>
        <div className="relative h-6 w-6">
          <NatureEffectIcon effectId={nerfEffectId} showOnNull/>
        </div>
      </Flex>
    </Flex>
  );
};

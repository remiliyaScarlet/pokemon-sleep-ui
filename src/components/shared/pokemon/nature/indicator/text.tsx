import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NatureEffectIcon} from '@/components/shared/pokemon/nature/effectIcon';
import {PokemonNatureIndicatorCommonProps} from '@/components/shared/pokemon/nature/indicator/type';
import {natureData} from '@/data/nature';


export const PokemonNatureIndicatorText = ({nature, hideName}: PokemonNatureIndicatorCommonProps) => {
  const t = useTranslations('Game');

  if (!nature) {
    return (
      <div className="h-5 w-5">
        <XCircleIcon/>
      </div>
    );
  }

  const dataOfNature = natureData.find(({id}) => id === nature);

  if (!dataOfNature) {
    return (
      <div className="h-5 w-5">
        <QuestionMarkCircleIcon/>
      </div>
    );
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
        <div className="h-4 w-4">
          <ChevronUpIcon/>
        </div>
        <div className="relative h-6 w-6">
          <NatureEffectIcon effectId={buffEffectId} showOnNull/>
        </div>
        <div className="h-4 w-4">
          <ChevronDownIcon/>
        </div>
        <div className="relative h-6 w-6">
          <NatureEffectIcon effectId={nerfEffectId} showOnNull/>
        </div>
      </Flex>
    </Flex>
  );
};

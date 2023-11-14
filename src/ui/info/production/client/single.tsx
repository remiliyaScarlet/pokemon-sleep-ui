import React from 'react';

import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import {clsx} from 'clsx';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {ValueError} from '@/components/shared/error';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/mainSkill/rate';
import {PokemonMainSkillValue} from '@/components/shared/pokemon/mainSkill/value/base';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/ingredientRate';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';
import {ProducingParamsBar} from '@/ui/info/production/client/bar';
import {producingParamsDataCountAlertThreshold} from '@/ui/info/production/client/const';
import {ProducingParamsMaximum} from '@/ui/info/production/client/type';
import {formatFloat, formatFloat3, formatInt} from '@/utils/number/format';


type Props = {
  pokemonInfo: PokemonInfo,
  params: PokemonProducingParams,
  maximum: ProducingParamsMaximum,
  show: boolean,
  onPokemonClicked: () => void,
};

export const ProducingParamsSingle = ({
  pokemonInfo,
  params,
  maximum,
  show,
  onPokemonClicked,
}: Props) => {
  const {
    dataCount,
    ingredientSplit,
    skillValue,
    skillPercent,
    error,
  } = params;

  const dimension: Dimension = 'h-5 w-5';

  return (
    <AnimatedCollapseQuick show={show} className="button-clickable-glow">
      <FlexButton noFullWidth={false} onClick={onPokemonClicked} direction="col" className="group">
        <Flex direction="row" className={clsx(
          'items-center gap-1 p-1',
          dataCount < producingParamsDataCountAlertThreshold && 'text-danger',
        )}>
          <Flex noFullWidth className="relative h-10 w-10 shrink-0">
            <PokemonImage pokemonId={pokemonInfo.id} image="icon" isShiny={false}/>
          </Flex>
          <Flex center className="gap-1">
            <Flex direction="row" className="justify-between gap-1">
              <Flex noFullWidth direction="row" className="items-end gap-1 whitespace-nowrap">
                <PokemonIngredientRate split={ingredientSplit} dimension={dimension}/>
                <ValueError valueError={formatFloat(error.ingredient)} className="text-xs"/>
              </Flex>
              <Flex noFullWidth direction="row" className={clsx('gap-1', !skillPercent && 'opacity-20')}>
                <PokemonMainSkillTriggerRate ratePercent={skillPercent} dimension={dimension}/>
              </Flex>
            </Flex>
            <Flex direction="row" className="justify-between gap-1">
              <Flex noFullWidth direction="row" className="items-center gap-1">
                <DocumentTextIcon className={dimension}/>
                <div>{formatInt(dataCount)}</div>
              </Flex>
              <Flex noFullWidth direction="row" className="items-end gap-1">
                <PokemonMainSkillValue value={skillValue} dimension={dimension}/>
                <ValueError valueError={formatFloat3(error.skill)} className="text-xs"/>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <ProducingParamsBar params={params} maximum={maximum}/>
      </FlexButton>
    </AnimatedCollapseQuick>
  );
};

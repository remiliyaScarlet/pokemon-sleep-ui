import React from 'react';

import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {Popup} from '@/components/popup';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonNameSimple} from '@/components/shared/pokemon/name/simple';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonInfo} from '@/types/game/pokemon';
import {SkillTriggerAnalysisCommonProps} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


type Props = SkillTriggerAnalysisCommonProps & {
  pokemon: PokemonInfo,
  unit: SkillTriggerAnalysisUnit,
  updateUnit: (update: Partial<SkillTriggerAnalysisUnit>) => void,
  deleteUnit: () => void,
  copyUnit: () => void,
};

export const SkillTriggerAnalysisTarget = (props: Props) => {
  const {
    subSkillMap,
    pokemon,
    unit,
    updateUnit,
    deleteUnit,
    copyUnit,
  } = props;

  const [show, setShow] = React.useState(false);

  const {skill} = pokemon;

  return (
    <AnimatedCollapseQuick show appear>
      <Flex center className="h-100 relative gap-1 rounded-lg bg-slate-500/10 p-2">
        <button onClick={deleteUnit} className="button-clickable absolute right-1 top-1 z-10 h-5 w-5 rounded-full">
          <XMarkIcon/>
        </button>
        <Popup show={show} setShow={setShow}>
          <Flex noFullWidth className="sm:w-[60vw]">
            <PokemonConfig
              {...props}
              data={unit}
              onDataUpdated={(update) => updateUnit(update)}
            />
          </Flex>
        </Popup>
        <Flex className="gap-1">
          <PokemonNameSimple pokemon={pokemon}/>
          <Flex direction="row" center>
            <div className="relative h-28 w-28">
              <PokemonImage pokemonId={pokemon.id} image="portrait" isShiny={false}/>
              <InfoIcon className="absolute bottom-0 right-0">
                {unit.level}
              </InfoIcon>
            </div>
          </Flex>
          <Flex direction="row" className="items-center justify-between">
            <FlexLink
              href={`/info/mainskill/${skill}`}
              className={clsx('p-1', pokemon.specialty === specialtyIdMap.skill && 'bg-blink')}
            >
              <MainSkillIcon id={skill} dimension="h-9 w-9"/>
            </FlexLink>
            <Flex className="items-end gap-1">
              <Flex direction="row" noFullWidth className="gap-1">
                <button className="button-clickable-bg h-7 w-7 p-1" onClick={copyUnit}>
                  <DocumentDuplicateIcon/>
                </button>
                <button className="button-clickable-bg h-7 w-7 p-1" onClick={() => setShow(true)}>
                  <PencilIcon/>
                </button>
              </Flex>
              <Flex noFullWidth className={clsx(
                'px-2 py-1 text-sm',
                pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
              )}>
                <PokemonIngredientIcons
                  ingredients={[Object.values(unit.ingredients).map((production) => production)]}
                  className="gap-1"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex center className="gap-1">
          <PokemonNatureIndicator nature={unit.nature}/>
          <PokemonSubSkillIndicator subSkill={unit.subSkill} subSkillMap={subSkillMap} className="justify-center"/>
        </Flex>
      </Flex>
    </AnimatedCollapseQuick>
  );
};

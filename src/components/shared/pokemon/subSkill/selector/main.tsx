import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokemonSubSkillSelectionButton} from '@/components/shared/pokemon/subSkill/selector/button';
import {PokemonSubSkillSelected} from '@/components/shared/pokemon/subSkill/selector/selected';
import {useSearchableData} from '@/hooks/search';
import {
  PokemonSubSkill,
  PokemonSubSkillLevel,
  pokemonSubSkillLevel,
  SubSkillId,
  SubSkillMap,
} from '@/types/game/pokemon/subskill';
import {isNotNullish} from '@/utils/type';


type Props = {
  subSkill: PokemonSubSkill,
  setSubSkill: (subSkill: PokemonSubSkill) => void,
  subSkillMap: SubSkillMap,
};

export const PokemonSubSkillSelector = ({subSkill, setSubSkill, subSkillMap}: Props) => {
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const t = useTranslations('Game.SubSkill.Name');

  const subSkills = Object.values(subSkillMap).filter(isNotNullish).filter(({rarity}) => !!rarity);

  const matchingSubSkills = useSearchableData({
    search,
    data: subSkills,
    getKeyword: (data) => t(data.id.toString()),
  });

  const onSelect = (id: SubSkillId) => {
    const emptyLevel = pokemonSubSkillLevel.find((level) => !subSkill[level]) ?? pokemonSubSkillLevel[0];

    setSubSkill({
      ...subSkill,
      [emptyLevel]: id,
    } satisfies PokemonSubSkill);
  };

  const onRemove = (level: PokemonSubSkillLevel) => {
    setSubSkill({
      ...subSkill,
      [level]: undefined,
    } satisfies PokemonSubSkill);
  };

  return (
    <>
      <button
        className="button-clickable-bg group h-full w-full whitespace-nowrap px-1.5 text-sm"
        onClick={() => setShow(true)}
      >
        <Flex direction="col" center>
          <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
        </Flex>
      </button>
      <Popup show={show} setShow={setShow}>
        <Flex direction="col" className="gap-2 pr-2">
          <Flex direction="row" wrap className={clsx(
            'sticky top-0 z-10 gap-2 rounded-lg bg-slate-50/90 p-1.5 dark:bg-slate-950/90',
          )}>
            {pokemonSubSkillLevel.map((level) => {
              const subSkillId = subSkill[level];
              const selected = subSkillId ? subSkillMap[subSkillId] : undefined;

              return (
                <PokemonSubSkillSelected
                  key={level} level={level} selected={selected}
                  onClick={() => onRemove(level)}
                />
              );
            })}
          </Flex>
          <Flex direction="row" center className="gap-1.5">
            <div className="h-6 w-6">
              <MagnifyingGlassIcon/>
            </div>
            <InputBox
              type="text"
              value={search}
              onChange={({target}) => setSearch(target.value)}
              className="w-full"
            />
          </Flex>
          {search ?
            <>
              <Flex direction="row" center wrap className="gap-2">
                {matchingSubSkills.length ?
                  matchingSubSkills.map((data) => (
                    <PokemonSubSkillSelectionButton
                      key={data.id} data={data} onClick={() => onSelect(data.id)}
                    />
                  )) :
                  <div className="h-9 w-9">
                    <QuestionMarkCircleIcon/>
                  </div>}
              </Flex>
              <HorizontalSplitter className="my-2"/>
            </> :
            <></>}
          <Flex direction="row" center wrap className="gap-2">
            {subSkills.map((data) => (
              <PokemonSubSkillSelectionButton
                key={data.id} data={data} onClick={() => onSelect(data.id)}
              />
            ))}
          </Flex>
        </Flex>
      </Popup>
    </>
  );
};

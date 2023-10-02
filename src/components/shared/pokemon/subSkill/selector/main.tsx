import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {Popup} from '@/components/popup';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokemonSubSkillSelectionButtons} from '@/components/shared/pokemon/subSkill/selector/buttons';
import {PokemonSubSkillSelected} from '@/components/shared/pokemon/subSkill/selector/selected';
import {useSearchableData} from '@/hooks/search';
import {
  PokemonSubSkill,
  PokemonSubSkillLevel,
  pokemonSubSkillLevel,
  SubSkillId,
  SubSkillMap,
} from '@/types/game/pokemon/subSkill';
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
  const selectedSubSkills = Object.values(subSkill);

  const matchingSubSkills = useSearchableData({
    search,
    data: subSkills,
    getKeyword: (data) => t(data.id.toString()),
    getSorter: (a, b) => (
      (b.rarity ?? 0) - (a.rarity ?? 0) ||
      t(a.id.toString()).localeCompare(t(b.id.toString()))
    ),
  });

  const isAllSelected = (subSkill: PokemonSubSkill): boolean => {
    return pokemonSubSkillLevel.every((level) => isNotNullish(subSkill[level]));
  };

  const onSelect = (id: SubSkillId) => {
    const emptyLevel = pokemonSubSkillLevel.find((level) => !subSkill[level]) ?? pokemonSubSkillLevel[0];
    const newSubSkill: PokemonSubSkill = {
      ...subSkill,
      [emptyLevel]: id,
    };

    setSubSkill(newSubSkill);
    if (isAllSelected(newSubSkill)) {
      setShow(false);
    }
  };

  const onRemove = (level: PokemonSubSkillLevel) => {
    const updated = {...subSkill};
    delete updated[level];

    setSubSkill(updated);
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
        <Flex direction="col" className="max-w-3xl gap-2">
          <Grid className={clsx(
            'sticky -top-2 z-10 gap-2 rounded-lg bg-slate-50/90 p-1.5 dark:bg-slate-950/90',
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-5',
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
          </Grid>
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
              <PokemonSubSkillSelectionButtons
                data={matchingSubSkills}
                selectedSubSkills={selectedSubSkills}
                onSelect={onSelect}
              />
              <HorizontalSplitter className="my-2"/>
            </> :
            <></>}
          <Flex direction="row" center wrap className="gap-2">
            <PokemonSubSkillSelectionButtons
              data={subSkills}
              selectedSubSkills={selectedSubSkills}
              onSelect={onSelect}
            />
          </Flex>
        </Flex>
      </Popup>
    </>
  );
};

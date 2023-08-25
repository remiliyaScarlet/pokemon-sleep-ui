import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subskill';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps, TeamAnalysisMember, TeamAnalysisSlotName} from '@/ui/team/analysis/type';


type Props = Pick<TeamAnalysisDataProps, 'berryMap' | 'subSkillMap'> & {
  setLevel: (newLevel: number) => void,
  setNature: (nature: NatureId | null) => void,
  setSubSkill: (subSkill: PokemonSubSkill) => void,
  slotName: TeamAnalysisSlotName,
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  producingStats: TeamProducingStatsSingle,
};

export const TeamAnalysisPokemon = ({
  setLevel,
  setNature,
  setSubSkill,
  member,
  pokemon,
  producingStats,
  berryMap,
  subSkillMap,
}: Props) => {
  const t = useTranslations('Game');

  const {id, type, berry, skill} = pokemon;
  const berryData = berryMap[berry.id];
  const maxLevel = berryData.energy.length;

  return (
    <>
      <Flex direction="row" center className="gap-0.5 whitespace-nowrap">
        <div className="relative h-5 w-5">
          <NextImage
            src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)}
            className="drop-shadow-thick" sizes={imageIconSizes}
          />
        </div>
        <div>
          {t(`PokemonName.${id}`)}
        </div>
      </Flex>
      <Flex direction="row" center>
        <div className="relative h-28 w-28">
          <PokemonImage pokemon={pokemon} image="portrait" isShiny={false}/>
        </div>
      </Flex>
      <Flex direction="col" className="justify-end">
        <Flex direction="row" className="justify-end">
          {/* FIXME: Click to show popup to edit */}
          <PokemonIngredientIcons ingredients={[Object.values(member.ingredients).map((production) => production)]}/>
        </Flex>
        <Flex direction="row" className="justify-end text-xs">
          <span className={clsx(pokemon.specialty === specialtyIdMap.skill && 'bg-blink', 'px-1.5 py-0.5')}>
            {t(`MainSkill.Name.${skill}`)}
          </span>
        </Flex>
      </Flex>
      <Flex direction="col" className="h-14 gap-1.5">
        <PokemonNatureSelector nature={member.nature} setNature={setNature} hideName/>
        <PokemonSubSkillSelector subSkill={member.subSkill} setSubSkill={setSubSkill} subSkillMap={subSkillMap}/>
      </Flex>
      <PokemonLevelSlider level={member.level} setLevel={setLevel} maxLevel={maxLevel} noSameLine/>
      <TeamAnalysisBerryRate
        id={berryData.id}
        rate={producingStats.berry}
        highlight={pokemon.specialty === specialtyIdMap.berry}
        period="daily"
      />
      <HorizontalSplitter className="w-full"/>
      {producingStats.ingredient.map((rate) => (
        <TeamAnalysisIngredientRate
          key={rate.id}
          id={rate.id}
          rate={rate}
          highlight={pokemon.specialty === specialtyIdMap.ingredient}
          period="daily"
        />
      ))}
    </>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/selector/nature/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/selector/subSkill/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes, imagePortraitSizes} from '@/styles/image';
import {PokemonSubSkill} from '@/types/game/pokemon/subskill';
import {NatureId} from '@/types/game/producing/nature';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/result/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/result/common/ingredient';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/result/type';
import {TeamAnalysisDataProps, TeamAnalysisMember, TeamAnalysisSlotName} from '@/ui/team/analysis/type';
import {classNames} from '@/utils/react';


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

  const {id, type, berry, ingredients, skill} = pokemon;
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
          <NextImage
            src={`/images/pokemon/portrait/${id}.png`} alt={t(`PokemonName.${id}`)} sizes={imagePortraitSizes}
          />
        </div>
      </Flex>
      <Flex direction="col" className="relative justify-end">
        <div className="absolute bottom-0 left-0 h-full">
          <PokemonNatureSelector nature={member.nature} setNature={setNature}/>
        </div>
        <Flex direction="row" className="justify-end">
          <PokemonIngredientIcons ingredients={ingredients}/>
        </Flex>
        <Flex direction="row" className="justify-end text-xs">
          <span className={classNames(pokemon.specialty === specialtyIdMap.skill ? 'bg-blink' : '', 'px-1.5 py-0.5')}>
            {t(`MainSkill.Name.${skill}`)}
          </span>
        </Flex>
      </Flex>
      <Flex direction="col" className="h-7">
        <PokemonSubSkillSelector subSkill={member.subSkill} setSubSkill={setSubSkill} subSkillMap={subSkillMap}/>
      </Flex>
      <PokemonLevelSlider level={member.level} setLevel={setLevel} maxLevel={maxLevel} noSameLine/>
      <TeamAnalysisBerryRate
        id={berryData.id} rate={producingStats.berry}
        highlight={pokemon.specialty === specialtyIdMap.berry}
      />
      <HorizontalSplitter className="w-full"/>
      <TeamAnalysisIngredientRate
        id={ingredients.fixed} rate={producingStats.ingredient}
        highlight={pokemon.specialty === specialtyIdMap.ingredient}
      />
    </>
  );
};

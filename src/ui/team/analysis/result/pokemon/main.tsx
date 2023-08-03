import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes, imagePortraitSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/result/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/result/common/ingredient';
import {TeamAnalysisPokemonLevel} from '@/ui/team/analysis/result/pokemon/level';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/result/type';
import {TeamAnalysisDataProps, TeamAnalysisMember, TeamAnalysisSlotName} from '@/ui/team/analysis/type';
import {classNames} from '@/utils/react';


type Props = Pick<TeamAnalysisDataProps, 'berryMap'> & {
  setLevel: (newLevel: number) => void,
  slotName: TeamAnalysisSlotName,
  slot: TeamAnalysisMember,
  pokemon: PokemonInfo,
  producingStats: TeamProducingStatsSingle,
};

export const TeamAnalysisPokemon = ({
  setLevel,
  slot,
  pokemon,
  berryMap,
  producingStats,
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
      <Flex direction="row" className="justify-end">
        <PokemonIngredientIcons ingredients={ingredients}/>
      </Flex>
      <Flex direction="row" className="justify-end text-xs">
        <span className={classNames(pokemon.specialty === specialtyIdMap.skill ? 'bg-blink' : '', 'px-1.5 py-0.5')}>
          {t(`MainSkill.Name.${skill}`)}
        </span>
      </Flex>
      <TeamAnalysisPokemonLevel level={slot.level} setLevel={setLevel} maxLevel={maxLevel}/>
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

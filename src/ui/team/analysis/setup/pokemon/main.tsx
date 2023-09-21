import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonCarryLimitInput} from '@/components/shared/pokemon/carryLimit/input';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/merged';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {TeamAnalysisRateLayout} from '@/ui/team/analysis/setup/common/rateLayout';
import {TeamAnalysisPokemonPopup} from '@/ui/team/analysis/setup/pokemon/popup';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';
import {toSum} from '@/utils/array';


export const TeamAnalysisPokemon = (props: TeamAnalysisPokemonProps) => {
  const {
    slotName,
    pokemon,
    member,
    setMember,
    stats,
    snorlaxFavorite,
    berryDataMap,
    subSkillMap,
    calculatedSettings,
  } = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata');
  const [showIngredientPicker, setShowIngredientPicker] = React.useState(false);
  const [showEvolutionSelector, setShowEvolutionSelector] = React.useState(false);
  const ratingControl = useRatingPopup();

  const {id, type, berry, skill} = pokemon;
  const berryData = berryDataMap[berry.id];
  const maxLevel = berryData.energy.length;

  return (
    <Flex direction="row" className="gap-1 md:flex-col">
      <TeamAnalysisPokemonPopup
        showIngredientPicker={showIngredientPicker}
        setShowIngredientPicker={setShowIngredientPicker}
        showEvolutionSelector={showEvolutionSelector}
        setShowEvolutionSelector={setShowEvolutionSelector}
        ratingControl={ratingControl}
        {...props}
      />
      <Flex direction="col" center className="gap-1">
        <Flex direction="row" center className="gap-0.5 whitespace-nowrap">
          <div className="relative h-5 w-5">
            <NextImage
              src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)}
              className="drop-shadow-thick" sizes={imageIconSizes}
            />
          </div>
          <div>
            {member.name ?? t(`PokemonName.${id}`)}
          </div>
        </Flex>
        <Flex direction="row" center>
          <div className="relative h-28 w-28">
            <PokemonImage pokemon={pokemon} image="portrait" isShiny={false}/>
          </div>
        </Flex>
        <Flex direction="col" className="items-center gap-1.5 sm:flex-row">
          <Flex direction="row" center noFullWidth className="gap-1.5">
            <button className="button-clickable-bg group p-1" onClick={() => ratingControl.sendRequest(toRatingSetup({
              member,
              pokemon,
              snorlaxFavorite,
              ...calculatedSettings,
            }))}>
              <PokemonDataIcon src="/images/generic/search.png" alt={t2('Rating.Title')} invert/>
            </button>
            <button className="button-clickable-bg h-8 w-8 p-1" onClick={() => setShowEvolutionSelector(true)}>
              <ArrowPathIcon/>
            </button>
          </Flex>
          <Flex direction="col" className="items-end gap-1">
            <button className="button-clickable-bg w-fit px-1.5" onClick={() => setShowIngredientPicker(true)}>
              <PokemonIngredientIcons
                ingredients={[Object.values(member.ingredients).map((production) => production)]}
                noLink
              />
            </button>
            <div className={clsx('px-1.5 py-0.5 text-xs', pokemon.specialty === specialtyIdMap.skill && 'bg-blink')}>
              {t(`MainSkill.Name.${skill}`)}
            </div>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="col" center className="gap-1">
        <Flex direction="col" className="h-14 gap-1.5">
          <PokemonNatureSelector
            nature={member.nature}
            setNature={(nature) => setMember(slotName, {nature})}
            hideName
          />
          <PokemonSubSkillSelector
            subSkill={member.subSkill}
            setSubSkill={(subSkill) => setMember(slotName, {subSkill})}
            subSkillMap={subSkillMap}
          />
        </Flex>
        <PokemonLevelSlider
          level={member.level}
          setLevel={(level) => setMember(slotName, {level})}
          maxLevel={maxLevel}
          noSameLine
        />
        <PokemonCarryLimitInput
          carryLimit={member.carryLimit}
          defaultCarryLimit={pokemon.stats.maxCarry}
          setCarryLimit={(carryLimit) => setMember(slotName, {carryLimit})}
        />
        <Flex direction="col" center>
          <PokemonFrequency
            baseFrequency={pokemon.stats.frequency}
            berryFrequency={stats.berry.frequency}
            ingredientFrequency={stats.ingredient.at(0)?.frequency ?? NaN}
          />
        </Flex>
        <HorizontalSplitter className="w-full"/>
        <TeamAnalysisRateLayout period="daily" showQuantity={false} rate={stats.total}/>
        <PokemonProductionSplit
          berry={stats.berry.dailyEnergy}
          ingredient={toSum(stats.ingredient.map(({dailyEnergy}) => dailyEnergy))}
          specialty={pokemon.specialty}
        />
        <HorizontalSplitter className="w-full"/>
        <Flex direction="col" className={clsx(pokemon.specialty === specialtyIdMap.berry && 'bg-blink')}>
          <TeamAnalysisBerryRate
            id={berryData.id}
            rate={stats.berry}
            period="daily"
          />
        </Flex>
        <HorizontalSplitter className="w-full"/>
        <Flex direction="col" className={clsx(pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink')}>
          {stats.ingredient.map((rate) => (
            <TeamAnalysisIngredientRate
              key={rate.id}
              id={rate.id}
              rate={rate}
              period="daily"
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps, TeamAnalysisMember, TeamAnalysisSlotName} from '@/ui/team/analysis/type';


type Props = TeamAnalysisDataProps & {
  slotName: TeamAnalysisSlotName,
  pokemon: PokemonInfo,
  member: TeamAnalysisMember,
  setMember: (slotName: TeamAnalysisSlotName, update: Partial<TeamAnalysisMember>) => void,
  producingStats: TeamProducingStatsSingle,
};

export const TeamAnalysisPokemon = ({
  berryMap,
  subSkillMap,
  ingredientChainMap,
  slotName,
  pokemon,
  member,
  setMember,
  producingStats,
}: Props) => {
  const t = useTranslations('Game');
  const [show, setShow] = React.useState(false);

  const {id, type, berry, skill, ingredientChain} = pokemon;
  const berryData = berryMap[berry.id];
  const maxLevel = berryData.energy.length;

  return (
    <Flex direction="row" className="gap-1 md:flex-col">
      <Popup show={show} setShow={setShow}>
        <PokemonIngredientPicker
          chain={ingredientChainMap[ingredientChain]}
          ingredients={member.ingredients}
          onSelect={(updated, ingredientLevel) => setMember(
            slotName,
            {
              ...member,
              ingredients: {
                ...member.ingredients,
                [ingredientLevel]: updated,
              },
            },
          )}
          idPrefix={id.toString()}
        />
      </Popup>
      <Flex direction="col" center className="gap-1">
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
        <button className="button-clickable-bg px-1.5" onClick={() => setShow(true)}>
          <Flex direction="row" className="justify-end">
            <PokemonIngredientIcons
              ingredients={[Object.values(member.ingredients).map((production) => production)]}
              noLink
            />
          </Flex>
        </button>
        <Flex direction="row" className="justify-end text-xs">
          <span className={clsx(pokemon.specialty === specialtyIdMap.skill && 'bg-blink', 'px-1.5 py-0.5')}>
            {t(`MainSkill.Name.${skill}`)}
          </span>
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
        <Flex direction="col" className={clsx(pokemon.specialty === specialtyIdMap.berry && 'bg-blink')}>
          <TeamAnalysisBerryRate
            id={berryData.id}
            rate={producingStats.berry}
            period="daily"
          />
        </Flex>
        <HorizontalSplitter className="w-full"/>
        <Flex direction="col" className={clsx(pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink')}>
          {producingStats.ingredient.map((rate) => (
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

import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/all';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {TeamAnalysisRateLayout} from '@/ui/team/analysis/setup/common/rateLayout';
import {toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';
import {TeamAnalysisFilledSlotProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps, TeamAnalysisMember, TeamAnalysisSlotName} from '@/ui/team/analysis/type';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledSlotProps & {
  setMember: (slotName: TeamAnalysisSlotName, update: Partial<TeamAnalysisMember>) => void,
};

export const TeamAnalysisPokemon = (props: Props) => {
  const {
    slotName,
    pokemon,
    member,
    setMember,
    stats,
    snorlaxFavorite,
    berryDataMap,
    subSkillMap,
    ingredientChainMap,
    pokedex,
    bonus,
  } = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata');
  const [showIngredientPicker, setShowIngredientPicker] = React.useState(false);
  const [showEvolutionSelector, setShowEvolutionSelector] = React.useState(false);
  const ratingControl = useRatingPopup();

  const {id, type, berry, skill, ingredientChain} = pokemon;
  const berryData = berryDataMap[berry.id];
  const maxLevel = berryData.energy.length;

  return (
    <Flex direction="row" className="gap-1 md:flex-col">
      <Popup show={showIngredientPicker} setShow={setShowIngredientPicker}>
        <Flex direction="col" noFullWidth className="sm:w-[70vw]">
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
        </Flex>
      </Popup>
      <Popup show={showEvolutionSelector} setShow={setShowEvolutionSelector}>
        <PokemonEvolutionSelector
          pokemon={pokemon}
          pokedex={pokedex}
          onClick={(pokemonId) => {
            setMember(slotName, {pokemonId});
            setShowEvolutionSelector(false);
          }}
        />
      </Popup>
      <RatingResultPopup ratingControl={ratingControl} {...props}/>
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
        <Flex direction="row" className="items-center">
          <Flex direction="row" center noFullWidth className="gap-1.5">
            <button className="button-clickable-bg group p-1" onClick={() => ratingControl.sendRequest(toRatingSetup({
              member,
              pokemon,
              snorlaxFavorite,
              bonus,
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
        <PokemonFrequency
          berryFrequency={stats.berry.frequency}
          ingredientFrequency={stats.ingredient.at(0)?.frequency ?? 0}
        />
        <HorizontalSplitter className="w-full"/>
        <TeamAnalysisRateLayout period="daily" showQuantity={false} rate={stats.total}/>
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

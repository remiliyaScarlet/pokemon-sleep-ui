import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisPokemonIndividualParams} from '@/ui/team/analysis/setup/pokemon/params';
import {TeamAnalysisPokemonPopup} from '@/ui/team/analysis/setup/pokemon/popup';
import {TeamAnalysisPokemonProduction} from '@/ui/team/analysis/setup/pokemon/production';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';


export const TeamAnalysisPokemon = (props: TeamAnalysisPokemonProps) => {
  const {
    pokemon,
    member,
    snorlaxFavorite,
    calculatedSettings,
  } = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata');
  const [showIngredientPicker, setShowIngredientPicker] = React.useState(false);
  const [showEvolutionSelector, setShowEvolutionSelector] = React.useState(false);
  const ratingControl = useRatingPopup();

  const {id, type, skill} = pokemon;

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
            <PokemonImage pokemonId={pokemon.id} image="portrait" isShiny={false}/>
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
        <TeamAnalysisPokemonIndividualParams {...props}/>
        <TeamAnalysisPokemonProduction {...props}/>
      </Flex>
    </Flex>
  );
};
